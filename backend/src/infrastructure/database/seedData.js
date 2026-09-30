import { query } from '../../config/database.js';
import { initializeDatabase } from './initDb.js';

export const seedDatabase = async () => {
  await initializeDatabase();

  console.log('🔄 Syncing authentic Sri Mahalakshmi menu items into PostgreSQL database...');

  // The authentic menu catalog matching the restaurant's real offerings
  const realMenuItems = [
    // ─── TIFFINS ───
    {
      name: 'Idly',
      category: 'Tiffins',
      price: 50,
      type: 'Veg',
      image_url: 'https://t3.ftcdn.net/jpg/03/62/02/26/360_F_362022640_fZ6UM0JycJlFDdBiR1pYlNddKfdGvYwR.jpg',
      description: 'Soft steamed rice cakes served with coconut chutney and hot drumstick sambar.',
      is_popular: true,
      is_signature: false,
    },
    {
      name: 'Sambar Idly',
      category: 'Tiffins',
      price: 50,
      type: 'Veg',
      image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGTWvL6FC79xPBiJtsSDYZ3dwKGMD1QDQbuYLVPuktjQ&s=10',
      description: 'Steamed idlys immersed in hot aromatic traditional sambar topped with fresh coriander.',
      is_popular: true,
      is_signature: true,
    },
    {
      name: 'Ghee Karam Idly',
      category: 'Tiffins',
      price: 50,
      type: 'Veg',
      image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOsR72951pZNDYCsQxwtYVdt8eyw8ZR7N83CjZK0BUfQ&s=10',
      description: 'Mini idlys tossed in rich pure desi ghee and spicy Andhra karam podi.',
      is_popular: true,
      is_signature: true,
    },
    {
      name: 'Mysore Bonda',
      category: 'Tiffins',
      price: 50,
      type: 'Veg',
      image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=500',
      description: 'Crispy on the outside, fluffy and soft inside golden fried bondas.',
      is_popular: true,
      is_signature: false,
    },
    {
      name: 'Wada',
      category: 'Tiffins',
      price: 50,
      type: 'Veg',
      image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=500',
      description: 'Crispy golden lentil medu vada served with freshly ground coconut chutney.',
      is_popular: false,
      is_signature: false,
    },
    {
      name: 'Sambar Wada',
      category: 'Tiffins',
      price: 50,
      type: 'Veg',
      image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=500',
      description: 'Crispy wadas soaked in flavorful vegetable sambar and finished with ghee.',
      is_popular: false,
      is_signature: false,
    },
    {
      name: 'Puri',
      category: 'Tiffins',
      price: 50,
      type: 'Veg',
      image_url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=500',
      description: 'Puffy deep-fried golden wheat puris served with potato sagu masala.',
      is_popular: true,
      is_signature: false,
    },
    {
      name: 'Plain Dosa',
      category: 'Tiffins',
      price: 40,
      type: 'Veg',
      image_url: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=500',
      description: 'Crispy, paper-thin golden fermented rice & lentil crepe with chutneys.',
      is_popular: false,
      is_signature: false,
    },
    {
      name: 'Masala Dosa',
      category: 'Tiffins',
      price: 60,
      type: 'Veg',
      image_url: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=500',
      description: 'Golden roasted crepe filled with savory spiced onion-potato masala.',
      is_popular: true,
      is_signature: true,
    },
    {
      name: 'Ghee Karam Dosa',
      category: 'Tiffins',
      price: 60,
      type: 'Veg',
      image_url: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=500',
      description: 'Crisp dosa roasted with pure desi ghee and fiery Telangana karam podi.',
      is_popular: true,
      is_signature: true,
    },
    {
      name: 'Egg Dosa',
      category: 'Tiffins',
      price: 60,
      type: 'Non-Veg',
      image_url: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=500',
      description: 'Golden crepe layered with beaten egg, onions, and crushed black pepper.',
      is_popular: true,
      is_signature: false,
    },
    {
      name: 'Plain Pesarattu',
      category: 'Tiffins',
      price: 50,
      type: 'Veg',
      image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=500',
      description: 'Nutritious green gram crepe served with spicy allam (ginger) chutney.',
      is_popular: false,
      is_signature: false,
    },
    {
      name: 'Paneer Dosa',
      category: 'Tiffins',
      price: 80,
      type: 'Veg',
      image_url: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=500',
      description: 'Crispy dosa loaded with grated fresh cottage cheese and mild spices.',
      is_popular: true,
      is_signature: false,
    },
    {
      name: 'Parotta (2)',
      category: 'Tiffins',
      price: 60,
      type: 'Veg',
      image_url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=500',
      description: 'Flaky, spiral layered parottas served with rich spicy salna gravy.',
      is_popular: true,
      is_signature: false,
    },

    // ─── CHINESE & FAST FOOD ───
    {
      name: 'Veg Fried Rice',
      category: 'Chinese',
      price: 80,
      type: 'Veg',
      image_url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=500',
      description: 'Wok-tossed long-grain rice with carrots, cabbage, capsicum, and scallions.',
      is_popular: false,
      is_signature: false,
    },
    {
      name: 'Paneer Fried Rice',
      category: 'Chinese',
      price: 120,
      type: 'Veg',
      image_url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=500',
      description: 'Aromatic fried rice tossed with crispy golden-fried paneer cubes.',
      is_popular: true,
      is_signature: false,
    },
    {
      name: 'Chicken Fried Rice',
      category: 'Chinese',
      price: 110,
      type: 'Non-Veg',
      image_url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=500',
      description: 'Street-style wok-tossed fried rice with shredded chicken and eggs.',
      is_popular: true,
      is_signature: false,
    },
    {
      name: 'Veg Noodles',
      category: 'Chinese',
      price: 80,
      type: 'Veg',
      image_url: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=500',
      description: 'Stir-fried noodles with crunchy julienned veggies in a savory garlic soy sauce.',
      is_popular: false,
      is_signature: false,
    },
    {
      name: 'Chicken Noodles',
      category: 'Chinese',
      price: 110,
      type: 'Non-Veg',
      image_url: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=500',
      description: 'Wok-tossed noodles with chicken pieces, egg ribbons, and bell peppers.',
      is_popular: true,
      is_signature: false,
    },
    {
      name: 'Veg Manchuria',
      category: 'Chinese',
      price: 90,
      type: 'Veg',
      image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=500',
      description: 'Crispy fried vegetable dumplings tossed in garlic, ginger, and chili sauce.',
      is_popular: true,
      is_signature: false,
    },
    {
      name: 'Chicken Manchuria',
      category: 'Chinese',
      price: 160,
      type: 'Non-Veg',
      image_url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=500',
      description: 'Crispy fried chicken bites simmered in glossy Indo-Chinese gravy.',
      is_popular: true,
      is_signature: true,
    },
    {
      name: 'Chilli Chicken',
      category: 'Chinese',
      price: 180,
      type: 'Non-Veg',
      image_url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=500',
      description: 'Fiery wok-tossed chicken chunks with green chillies, onions, and dark soy.',
      is_popular: true,
      is_signature: true,
    },
    {
      name: 'Chicken 65',
      category: 'Chinese',
      price: 180,
      type: 'Non-Veg',
      image_url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=500',
      description: 'Spicy, deep-fried chicken cubes tempered with curry leaves and mustard seeds.',
      is_popular: true,
      is_signature: true,
    },

    // ─── BIRYANI ───
    {
      name: 'Chicken Dum Biryani',
      category: 'Biryani',
      price: 140,
      type: 'Non-Veg',
      image_url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=500',
      description: 'Slow-cooked fragrant basmati rice with tender spiced chicken, mint, and saffron.',
      is_popular: true,
      is_signature: true,
    },
    {
      name: 'Chicken Fry Piece Biryani',
      category: 'Biryani',
      price: 160,
      type: 'Non-Veg',
      image_url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=500',
      description: 'Aromatic biryani rice crowned with spicy Andhra roasted chicken fry pieces.',
      is_popular: true,
      is_signature: true,
    },
    {
      name: 'Chicken 65 Biryani',
      category: 'Biryani',
      price: 190,
      type: 'Non-Veg',
      image_url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=500',
      description: 'Biryani rice served with boneless crispy spicy Chicken 65 bites.',
      is_popular: true,
      is_signature: true,
    },
    {
      name: 'Veg Biryani',
      category: 'Biryani',
      price: 120,
      type: 'Veg',
      image_url: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=500',
      description: 'Fragrant basmati rice layered with fresh seasonal vegetables and whole spices.',
      is_popular: false,
      is_signature: false,
    },
    {
      name: 'Egg Biryani',
      category: 'Biryani',
      price: 140,
      type: 'Non-Veg',
      image_url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=500',
      description: 'Flavored dum rice cooked with 2 roasted spiced boiled eggs.',
      is_popular: false,
      is_signature: false,
    },
    {
      name: 'Paneer Biryani',
      category: 'Biryani',
      price: 130,
      type: 'Veg',
      image_url: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=500',
      description: 'Marinated paneer cubes layered with caramelized onions and aromatic herbs.',
      is_popular: true,
      is_signature: false,
    },

    // ─── CURRIES ───
    {
      name: 'Veg Meals',
      category: 'Curries',
      price: 140,
      type: 'Veg',
      image_url: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&q=80&w=500',
      description: 'Traditional South Indian thali spread with rice, sambar, rasam, curries, and appalam.',
      is_popular: true,
      is_signature: true,
    },
    {
      name: 'Dal Fry',
      category: 'Curries',
      price: 80,
      type: 'Veg',
      image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=500',
      description: 'Comforting yellow lentils tempered with ghee, cumin seeds, garlic, and chillies.',
      is_popular: false,
      is_signature: false,
    },
    {
      name: 'Paneer Butter Masala',
      category: 'Curries',
      price: 200,
      type: 'Veg',
      image_url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=500',
      description: 'Velvety cashew-tomato makhani gravy with melt-in-mouth cottage cheese cubes.',
      is_popular: true,
      is_signature: true,
    },
    {
      name: 'Chicken Curry',
      category: 'Curries',
      price: 100,
      type: 'Non-Veg',
      image_url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=500',
      description: 'Homestyle spicy Telangana chicken curry cooked with ground coriander and spices.',
      is_popular: true,
      is_signature: false,
    },
    {
      name: 'Butter Chicken',
      category: 'Curries',
      price: 160,
      type: 'Non-Veg',
      image_url: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=500',
      description: 'Succulent chicken in a mild, buttery tomato cream gravy with fenugreek leaves.',
      is_popular: true,
      is_signature: true,
    },
    {
      name: 'Gongura Chicken',
      category: 'Curries',
      price: 200,
      type: 'Non-Veg',
      image_url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=500',
      description: 'Tangy and fiery authentic Andhra chicken dish prepared with sorrel leaves.',
      is_popular: true,
      is_signature: true,
    },

    // ─── RICE ───
    {
      name: 'Jeera Rice',
      category: 'Rice',
      price: 90,
      type: 'Veg',
      image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=500',
      description: 'Steamed basmati rice tempered with roasted cumin seeds and desi ghee.',
      is_popular: false,
      is_signature: false,
    },
    {
      name: 'Curd Rice',
      category: 'Rice',
      price: 100,
      type: 'Veg',
      image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=500',
      description: 'Creamy yogurt rice tempered with mustard seeds, curry leaves, and green chillies.',
      is_popular: true,
      is_signature: false,
    },
    {
      name: 'Tomato Rice',
      category: 'Rice',
      price: 90,
      type: 'Veg',
      image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=500',
      description: 'Tangy spiced rice cooked with ripe country tomatoes and roasted spices.',
      is_popular: false,
      is_signature: false,
    },
    {
      name: 'Lemon Rice',
      category: 'Rice',
      price: 90,
      type: 'Veg',
      image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=500',
      description: 'Zesty lemon flavored rice tempered with crunchy peanuts and curry leaves.',
      is_popular: false,
      is_signature: false,
    },
    {
      name: 'Ghee Kaju Rice',
      category: 'Rice',
      price: 160,
      type: 'Veg',
      image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=500',
      description: 'Delicately spiced rice cooked in pure ghee and topped with roasted golden cashews.',
      is_popular: true,
      is_signature: true,
    },
  ];

  // Clean out any previous dummy items and insert the authentic menu
  await query('DELETE FROM menu_items');

  for (const item of realMenuItems) {
    await query(
      `INSERT INTO menu_items (name, category, price, type, image_url, description, is_popular, is_signature, is_available)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, true)`,
      [
        item.name,
        item.category,
        item.price,
        item.type,
        item.image_url,
        item.description,
        item.is_popular,
        item.is_signature,
      ]
    );
  }

  console.log(`✅ Successfully seeded ${realMenuItems.length} authentic dishes into PostgreSQL.`);

  // ─── GALLERY ITEMS ───
  console.log('🔄 Syncing gallery moments into PostgreSQL database...');
  await query('DELETE FROM gallery_items');

  const galleryItems = [
    { title: 'Morning Kitchen Prep', category: 'Kitchen', image_url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800' },
    { title: 'Grand Wedding Feast Setup', category: 'Events', image_url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800' },
    { title: 'Live Counter Service', category: 'Catering', image_url: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800' },
    { title: 'Traditional Charcoal Dum Biryani Cooking', category: 'Kitchen', image_url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800' },
    { title: 'Corporate Banquet Reception', category: 'Events', image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800' },
    { title: 'Buffet & Food Distribution Service', category: 'Catering', image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800' },
    { title: 'Intimate Family Gathering Dining', category: 'Events', image_url: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=800' },
    { title: 'Master Chef Preparing Fresh Tawa Dosas', category: 'Kitchen', image_url: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=800' },
    { title: 'Serving Piping Hot Sambar Idly', category: 'Catering', image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800' },
  ];

  for (const g of galleryItems) {
    await query(
      `INSERT INTO gallery_items (title, category, image_url)
       VALUES ($1, $2, $3)`,
      [g.title, g.category, g.image_url]
    );
  }
  console.log(`✅ Successfully seeded ${galleryItems.length} gallery moments into PostgreSQL.`);
};

if (process.argv[1]?.endsWith('seedData.js')) {
  seedDatabase()
    .then(() => {
      console.log('Seeding finished.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Seeding failed:', err);
      process.exit(1);
    });
}
