import fs from 'fs';
const file = 'src/pages/tools/LinkedInAssistTool.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/\[primary\]/g, 'primary');
fs.writeFileSync(file, content);
console.log('Replacements done.');
