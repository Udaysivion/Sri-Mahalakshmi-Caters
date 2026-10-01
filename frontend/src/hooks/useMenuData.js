import { useState, useEffect } from 'react';
import Papa from 'papaparse';

const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/10piS5vroWp7u2kwFHwknmuZP-vbRe6JSR24aaWaxk5E/export?format=csv&gid=0';

export const useMenuData = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Papa.parse(GOOGLE_SHEET_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData = results.data
          .filter(row => row['Item Name'] && row['Price (INR)']) 
          .map((row, index) => {
            const name = row['Item Name'] || '';
            const isNonVeg = /chicken|egg|mutton|fish/i.test(name);
            
            // Extract the first number found in price string
            const priceMatch = row['Price (INR)'].toString().match(/\d+/);
            const price = priceMatch ? parseInt(priceMatch[0]) : 0;
            
            // Use exact Category from sheet
            let cat = row['Category']?.trim() || 'Other';
            let imgUrl = row['image url']?.trim();

            if (imgUrl && imgUrl.includes('drive.google.com')) {
              const match = imgUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
              const idMatch = imgUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
              const id = (match && match[1]) || (idMatch && idMatch[1]);
              if (id) {
                // Use lh3.googleusercontent.com which reliably returns raw image data for <img> tags
                imgUrl = `https://lh3.googleusercontent.com/d/${id}`;
              }
            }
            imgUrl = imgUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400';

            return {
              id: `sheet-${index}`,
              cat: cat,
              name: name,
              price: price,
              type: isNonVeg ? 'Non-Veg' : 'Veg',
              img: imgUrl,
              desc: row['Category'] || '', 
              best: false,
              special: false
            };
          });
        setMenuItems(parsedData);
        setLoading(false);
      },
      error: (err) => {
        console.error("Error fetching menu data:", err);
        setError(err);
        setLoading(false);
      }
    });
  }, []);

  return { menuItems, loading, error };
};
