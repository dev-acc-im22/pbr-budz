import fs from 'fs';
const file = 'src/pages/tools/LinkedInAssistTool.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/#0A66C2/g, 'primary');
content = content.replace(/primary\/90/g, 'primary/80');
fs.writeFileSync(file, content);
console.log('Replacements done.');
