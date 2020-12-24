"use strict"
var x;
if (true) {
    let y;
    x = 2;
    y = 2;
    console.log(x * y);
}
const z = 1; 
console.log(z);

const xz = { name: "x"};
xz.name = "y";
xz.prop = 3;
xz = {name : "x"};
console.log(xz);
console.log(xz.prop);