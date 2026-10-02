import { useState, useEffect } from 'react';
import Papa from 'papaparse';

/**
 * Converts any Google Sheet link into a direct CSV export endpoint.
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

  useEffect(() => {
    if (!SHEET_URL) {
      console.warn("⚠️ VITE_MENU_SHEET_URL is not configured in .env");
      setLoading(false);
      return;
    }

    Papa.parse(SHEET_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData = (results.data || [])
          .filter(row => row['Item Name'] && row['Price (INR)'])
          .map((row, index) => {
            const name = (row['Item Name'] || '').trim();
            const isNonVeg = /chicken|egg|mutton|fish/i.test(name);

            // Extract numeric price
            const priceMatch = (row['Price (INR)'] || '').toString().match(/\d+/);
            const price = priceMatch ? parseInt(priceMatch[0], 10) : 0;

            const category = (row['Category'] || 'Other').trim();
            let cat = category;
            if (cat.includes('Biryani')) cat = 'Biryani';
            else if (cat.includes('Chinese')) cat = 'Chinese';

            let imgUrl = (row['image url'] || '').trim();

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
              id: `sheet-${index}`,
              cat: cat,
              name: name,
              price: price,
              type: isNonVeg ? 'Non-Veg' : 'Veg',
              img: imgUrl,
              desc: category,
              best: false,
              special: false
            };
          });

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

  return { menuItems, loading, error };
};
