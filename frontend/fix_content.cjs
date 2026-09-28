const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        filelist = walkSync(filePath, filelist);
      }
    } else {
      if (filePath.endsWith('.jsx') || filePath.endsWith('.css') || filePath.endsWith('.html')) {
        filelist.push(filePath);
      }
    }
  });
  return filelist;
};

const replaceInFiles = () => {
  const srcDir = path.join(__dirname, 'src');
  let files = walkSync(srcDir);
  files.push(path.join(__dirname, 'index.html'));
  
  files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    // Fix broken Unsplash image (Chicken Fry, Chicken 65, etc)
    const oldImg = 'https://images.unsplash.com/photo-1626508035297-0e69d0f26e2c';
    const newImg = 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d';
    if (content.includes(oldImg)) {
      content = content.replace(new RegExp(oldImg, 'g'), newImg);
      changed = true;
    }
    
    // Replace "Village Kitchen" component and text carefully in Home.jsx
    if (content.includes('VillageKitchen')) {
      content = content.replace(/VillageKitchen/g, 'SignatureDishes');
      content = content.replace(/Village Kitchen 🍛/g, 'Signature Dishes 🍛');
      changed = true;
    }

    // Replace other specific phrases
    const phrases = [
      { from: /Taste the Village/g, to: 'Taste the Authenticity' },
      { from: /Rooted in the Village/g, to: 'Rooted in Tradition' },
      { from: /Village-Style/g, to: 'Authentic' },
      { from: /village-style/g, to: 'authentic' },
      { from: /Village hospitality/g, to: 'Premium hospitality' },
      { from: /warmth of village cooking/g, to: 'warmth of authentic cooking' },
      { from: /everyday village home/g, to: 'everyday dining home' },
      { from: /authentic village feast/g, to: 'authentic feast' },
      { from: /In our village/g, to: 'In our tradition' },
      { from: /Village Gathering/g, to: 'Event Gathering' },
      { from: /Ambient Village Setting/g, to: 'Ambient Dining Setting' },
      { from: /village recipes/g, to: 'authentic recipes' },
      { from: /village style/gi, to: 'authentic style' },
      { from: /Village Specials/g, to: 'Chef Specials' },
      { from: /village restaurant/gi, to: 'authentic restaurant' }
    ];

    phrases.forEach(p => {
      if (p.from.test(content)) {
        content = content.replace(p.from, p.to);
        changed = true;
      }
    });

    if (changed) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Updated ' + file);
    }
  });
};

replaceInFiles();
