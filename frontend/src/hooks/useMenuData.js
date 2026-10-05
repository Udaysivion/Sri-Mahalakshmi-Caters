import { useState, useEffect, useCallback } from 'react';
import Papa from 'papaparse';

/**
 * Converts any Google Sheet link into a direct CSV / GViz live data export endpoint.
 * Supports:
 * - https://docs.google.com/spreadsheets/d/{id}/edit#gid={gid}
 * - https://docs.google.com/spreadsheets/d/{id}/export?format=csv
 * - Direct CSV / gviz URLs
 */
const getGoogleSheetCsvUrl = (rawUrl) => {
  if (!rawUrl) return '';
  const trimmed = rawUrl.trim();
  const sheetIdMatch = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  if (sheetIdMatch && sheetIdMatch[1]) {
    const sheetId = sheetIdMatch[1];
    const gidMatch = trimmed.match(/[?&#]gid=([0-9]+)/);
    const gid = gidMatch ? gidMatch[1] : '0';
    // Use Google GViz API export endpoint which bypasses CDN caching for live real-time sync
    return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&gid=${gid}`;
  }
  return trimmed;
};

// Read Google Sheet URL exclusively from environment variables
const SHEET_URL = getGoogleSheetCsvUrl(
  import.meta.env.VITE_MENU_SHEET_URL || import.meta.env.VITE_GOOGLE_SHEET_URL || ''
);

export const useMenuData = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUnavailableDishes = () => {
    try {
      return JSON.parse(localStorage.getItem('unavailable_dishes') || '[]');
    } catch {
      return [];
    }
  };

  const fetchMenuData = useCallback((isManualRefetch = false) => {
    if (isManualRefetch) setLoading(true);
    if (!SHEET_URL) {
      console.warn("⚠️ VITE_MENU_SHEET_URL is not configured in .env");
      setLoading(false);
      return;
    }

    const timestamp = Date.now();
    const fetchUrl = `${SHEET_URL}&t=${timestamp}`;
    const unavailableDishes = getUnavailableDishes();

    Papa.parse(fetchUrl, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData = (results.data || [])
          .map((row, index) => {
            const keys = Object.keys(row);
            const findVal = (regex, fallbackIdx) => {
              const matchedKey = keys.find(k => regex.test(k));
              if (matchedKey && row[matchedKey] !== undefined && row[matchedKey] !== null) {
                return String(row[matchedKey]).trim();
              }
              if (keys[fallbackIdx] !== undefined && row[keys[fallbackIdx]] !== undefined && row[keys[fallbackIdx]] !== null) {
                return String(row[keys[fallbackIdx]]).trim();
              }
              return '';
            };

            const name = findVal(/name|item|dish|title/i, 1);
            if (!name || name.toLowerCase() === 'item name' || name.toLowerCase() === 'name') {
              return null; // Ignore header or empty rows without item name
            }

            const category = findVal(/cat|category|type|section/i, 0) || 'Other';
            const priceStr = findVal(/price|cost|rate|inr|rs|amount/i, 2);
            let imgUrl = findVal(/img|image|photo|url|pic|link/i, 3);
            const statusVal = findVal(/available|status|active|stock/i, 4);

            // Check availability from sheet column or local admin toggle override
            let isAvailable = true;
            if (statusVal && /no|false|0|off|out/i.test(statusVal)) {
              isAvailable = false;
            }
            const nameLower = name.toLowerCase();
            if (unavailableDishes.includes(nameLower)) {
              isAvailable = false;
            }

            // Extract numeric price
            const priceMatch = priceStr.match(/\d+/);
            const price = priceMatch ? parseInt(priceMatch[0], 10) : 0;

            const isNonVeg = /chicken|egg|mutton|fish|prawn/i.test(name);

            let cat = category;
            if (/biryani/i.test(cat)) cat = 'Biryani';
            else if (/chinese/i.test(cat)) cat = 'Chinese';

            // Convert Google Drive view links to direct image stream URLs
            if (imgUrl && (imgUrl.includes('drive.google.com') || imgUrl.includes('drive.usercontent.google.com'))) {
              const match = imgUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
              const idMatch = imgUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
              const driveId = (match && match[1]) || (idMatch && idMatch[1]);
              if (driveId) {
                imgUrl = `https://lh3.googleusercontent.com/d/${driveId}`;
              }
            }

            return {
              id: `sheet-${index}-${name.replace(/\s+/g, '-').toLowerCase()}`,
              cat: cat,
              category: cat,
              name: name,
              price: price,
              type: isNonVeg ? 'Non-Veg' : 'Veg',
              img: imgUrl,
              desc: category,
              available: isAvailable,
              best: false,
              special: false
            };
          })
          .filter(Boolean);

        setMenuItems(parsedData);
        setLoading(false);
      },
      error: (err) => {
        console.error("Error fetching menu data from Google Sheet:", err);
        setError(err);
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    fetchMenuData();
  }, [fetchMenuData]);

  const toggleAvailability = (dishName) => {
    if (!dishName) return;
    const nameLower = dishName.toLowerCase();
    const currentUnavailable = getUnavailableDishes();
    let updated;
    let nextAvailableState;
    if (currentUnavailable.includes(nameLower)) {
      updated = currentUnavailable.filter(n => n !== nameLower);
      nextAvailableState = true;
    } else {
      updated = [...currentUnavailable, nameLower];
      nextAvailableState = false;
    }
    localStorage.setItem('unavailable_dishes', JSON.stringify(updated));

    // Update local state instantly
    setMenuItems(prev => prev.map(item => {
      if (item.name.toLowerCase() === nameLower) {
        return { ...item, available: nextAvailableState };
      }
      return item;
    }));

    return nextAvailableState;
  };

  const refetch = () => fetchMenuData(true);

  return { menuItems, loading, error, refetch, toggleAvailability };
};

