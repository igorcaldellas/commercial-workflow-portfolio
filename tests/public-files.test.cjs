const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const dir=path.resolve('dist'),files=fs.readdirSync(dir);
assert.ok(files.includes('index.html')&&files.includes('pt.html'));
const forbidden=/krelixir|kr\s*elixir|\bKRE\b|fortbras|equifax|dexco|hypera|ingredion|supabase|api[_-]?key|bearer\s+[a-z0-9._-]+|C:\\Users\\/i;
for(const name of files){assert.match(name,/\.(html|css|js)$/);const text=fs.readFileSync(path.join(dir,name),'utf8');assert.equal(forbidden.test(text),false,`Review possible private content in ${name}`);assert.equal(/resume\.pdf/.test(text),false,'No private résumé attachment');if(name.endsWith('.html'))for(const m of text.matchAll(/(?:src|href)="([^"#]+)"/g)){if(/^(?:https?:|mailto:)/.test(m[1]))continue;assert.ok(fs.existsSync(path.join(dir,m[1].split('#')[0])),`Missing local asset: ${m[1]}`);}}
console.log('PASS: public file allowlist, content markers and local asset links');
