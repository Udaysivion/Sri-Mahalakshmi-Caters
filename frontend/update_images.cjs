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
      if (filePath.endsWith('.jsx')) {
        filelist.push(filePath);
      }
    }
  });
  return filelist;
};

const replaceInFiles = () => {
  const srcDir = path.join(__dirname, 'src');
  let files = walkSync(srcDir);
  
  files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    // Replace the "carrots" image (1582515073490) with a beautiful Banquet / Restaurant Dine-in image
    // https://images.unsplash.com/photo-1414235077428-338989a2e8c0 (Fine dining restaurant interior)
    const carrotImg = '1582515073490-39981397c445';
    const grandDiningImg = '1414235077428-338989a2e8c0';
    if (content.includes(carrotImg)) {
      content = content.replace(new RegExp(carrotImg, 'g'), grandDiningImg);
      changed = true;
    }

    // Replace other generic ones with catering/food ordering specifics
    // https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b (Old table spread) 
    // -> Replace with Catering Buffet: 1555244162-803834f70033
    const oldTable = '1514362545857-3bc16c4c7d1b';
    const cateringBuffet = '1555244162-803834f70033';
    if (content.includes(oldTable)) {
      content = content.replace(new RegExp(oldTable, 'g'), cateringBuffet);
      changed = true;
    }

    // Gallery and About photo strip updates (let's add a food delivery/ordering image)
    // 1563379091339-03b21ab4a4f8 -> 1526315274106-ee192b028682 (takeout/food order)
    const oldMisc = '1563379091339-03b21ab4a4f8';
    const takeoutImg = '1526315274106-ee192b028682';
    if (content.includes(oldMisc)) {
      content = content.replace(new RegExp(oldMisc, 'g'), takeoutImg);
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Updated images in ' + file);
    }
  });
};

replaceInFiles();
