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
  const files = walkSync(srcDir);
  
  files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    // Replace 1551239841-f7e9f3b14bb2 with a working Dosa image
    const brokenDosa = '1551239841-f7e9f3b14bb2';
    const workingDosa = '1589301760014-d929f3979dbc';
    if (content.includes(brokenDosa)) {
      content = content.replace(new RegExp(brokenDosa, 'g'), workingDosa);
      changed = true;
    }

    // Replace 1627308595229-7830f5c90663 with another working Idly/Dosa image
    const brokenIdly = '1627308595229-7830f5c90663';
    const workingIdly = '1601050690597-df0568f70950';
    if (content.includes(brokenIdly)) {
      content = content.replace(new RegExp(brokenIdly, 'g'), workingIdly);
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Fixed images in ' + file);
    }
  });
};

replaceInFiles();
