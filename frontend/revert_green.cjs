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
      if (filePath.endsWith('.jsx') || filePath.endsWith('.css')) {
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
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    if (content.includes('#2D6A2F') || content.includes('rgba(45,106,47') || content.includes('#1A4A1C')) {
      content = content.replace(/#2D6A2F/gi, '#1B4332');
      content = content.replace(/rgba\(45,\s*106,\s*47/gi, 'rgba(27,67,50');
      // replace the darker green hover too (#1A4A1C -> #0D2219)
      content = content.replace(/#1A4A1C/gi, '#0D2219');
      changed = true;
    }
    
    if (changed) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Updated ' + file);
    }
  });
};

replaceInFiles();
