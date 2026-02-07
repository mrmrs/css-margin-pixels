const fs = require('fs');
const path = require('path');
const { transform } = require('lightningcss');

const srcFile = path.join(__dirname, 'src', 'css-margin-pixels.css');
const distDir = path.join(__dirname, 'dist');

// Read source
const source = fs.readFileSync(srcFile, 'utf8');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Unminified — just normalize formatting
const { code: unminified } = transform({
  filename: 'css-margin-pixels.css',
  code: Buffer.from(source),
  minify: false,
});

fs.writeFileSync(path.join(distDir, 'css-margin-pixels.css'), unminified);

// Minified
const { code: minified } = transform({
  filename: 'css-margin-pixels.css',
  code: Buffer.from(source),
  minify: true,
});

fs.writeFileSync(path.join(distDir, 'css-margin-pixels.min.css'), minified);

console.log('Build complete:');
console.log(`  dist/css-margin-pixels.css     ${unminified.length} bytes`);
console.log(`  dist/css-margin-pixels.min.css ${minified.length} bytes`);
