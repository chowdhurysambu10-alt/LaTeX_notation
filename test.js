const fs = require('fs');
eval(fs.readFileSync('script.js', 'utf8').split('// 2. Application Logic')[0]);
console.log(parseCppToLatex("(-b + sqrt(pow(b,2) - 4*a*c)) / (2*a)"));
