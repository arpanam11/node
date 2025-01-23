//node .\index.js
console.log("hi")

var a=10;
var b= 10;
console.warn(a+b)

//file system
const fs = require("fs")
fs.writeFileSync("app.txt","this is app file create using fs")