import fs from 'fs';
const file = 'src/pages/tools/XAssistTool.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/blue-500/g, 'primary');
content = content.replace(/blue-600/g, 'primary/80');
fs.writeFileSync(file, content);
console.log('Replacements done.');
