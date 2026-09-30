import { useState, useEffect } from 'react';
import menuApi from '../api/menuApi';
import Papa from 'papaparse';

const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/10piS5vroWp7u2kwFHwknmuZP-vbRe6JSR24aaWaxk5E/export?format=csv&gid=0';

export const useMenu = (filters = {}) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMenu = async () => {
      setLoading(true);
      setError(null);
      try {
        // Attempt to fetch from backend PostgreSQL API first
        const data = await menuApi.getMenuItems(filters);
        if (isMounted && Array.isArray(data) && data.length > 0) {
          const mapped = data.map((item) => ({
            id: item.id,
            cat: item.category,
            name: item.name,
            price: item.price,
            type: item.type,
            img: item.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
            desc: item.description || item.category,
            best: item.isPopular,
            special: item.isSignature,
          }));
          setMenuItems(mapped);
          setLoading(false);
          return;
        }
      } catch (backendErr) {
        console.warn('Backend menu API unavailable, falling back to Google Sheet / cached data:', backendErr.message);
      }

      // Fallback: Parse Google Sheet data
      Papa.parse(GOOGLE_SHEET_URL, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (!isMounted) return;
          const parsedData = results.data
            .filter((row) => row['Item Name'] && row['Price (INR)'])
            .map((row, index) => {
              const name = row['Item Name'] || '';
              const isNonVeg = /chicken|egg|mutton|fish/i.test(name);
              const priceMatch = row['Price (INR)'].toString().match(/\d+/);
              const price = priceMatch ? parseInt(priceMatch[0], 10) : 0;
              let cat = row['Category'] || 'Other';
              if (cat.includes('Biryani & Curries')) {
                cat = /biryani/i.test(name) ? 'Biryani' : 'Curries';
              } else if (cat.includes('Chinese') || cat.includes('Noodles')) {
                cat = 'Chinese';
              }

              return {
                id: `sheet-${index}`,
                cat,
                name,
                price,
                type: isNonVeg ? 'Non-Veg' : 'Veg',
                img: row['image url']?.trim() || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
                desc: row['Category'] || '',
                best: false,
                special: false,
              };
            });
          setMenuItems(parsedData);
          setLoading(false);
        },
        error: (err) => {
          if (isMounted) {
            setError(err);
            setLoading(false);
          }
        },
      });
    };

    fetchMenu();

    return () => {
      isMounted = false;
    };
  }, [filters.category, filters.type, filters.search]);

  return { menuItems, loading, error };
};

export default useMenu;
