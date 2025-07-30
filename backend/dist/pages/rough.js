"use strict";
let arr1 = [1, 2, 3, { name: "sunny" }];
let arr2 = ["sojefosj"];
let arr = ["sun", 25]; //  when things are fixed called tuple
var companyData;
(function (companyData) {
    companyData[companyData["code1"] = 404] = "code1";
    companyData[companyData["code2"] = 500] = "code2";
    companyData[companyData["code3"] = 600] = "code3";
})(companyData || (companyData = {}));
companyData.code2;
let a;
let b;
let c;
c = 12;
c = "string";
if (typeof c === "string") // in unknown have to specifically clarify before use is it string or number
    c.toUpperCase();
function ok() {
    let a = 2 + 2;
    return a;
}
console.log(ok());
function login(obj) {
    // obj.name = "sunny",
    // obj.email = "jin@gmail.com",
    // obj.pass = "dfhksh"
    console.log(obj.name);
}
login({ name: "sunny", email: "jin", pass: "sfldljs", mobileNumber: "sfhihihi" });
console.log();
let d;
d = "sljd";
class bottle {
    constructor(name, price, color) {
        this.name = name;
        this.price = price;
        this.color = color;
    }
}
const a1 = new bottle("milton", 1000, "black");
console.log(a1);
class thisDot {
    constructor() {
        this.name = "sunny";
        this.ok = () => {
            let nop = this.name; // to access variable or methods(function) inside other method(functions) we use this.
            return nop;
        };
    }
    access() {
        let pok = this.name;
    }
}
let bb = new thisDot();
bb.ok();
bb.access();
class look {
    constructor(name) {
        this.name = name;
    }
}
let qq = new look("pop");
// readonly
class readOnly {
    constructor(name) {
        this.name = name;
    }
}
// getter setter
class get_Set {
    constructor(name) {
        this.name = name;
    }
    get username() {
        return this.name;
    }
    set username(value) {
        this.name = value;
    }
}
let kk = new get_Set("klaus");
console.log(kk.username);
kk.username = "jin";
console.log(kk.username);
// static
class data {
    static user() {
        return Math.random();
    }
}
data.ball = "oo yeah"; // static do not need any instances can use directly 
console.log(data.ball);
console.log(data.user());
// ...rest / ...spread
function dot(...arr) {
    console.log(arr);
}
dot(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
let array = [1, 2, 3, 4, 5];
let array1 = [...array]; // ...spread operator to copy
console.log(array1);
// function overloading
// function abcd(a: string): void;
// function abcd(a: string, b: number): number;
// function abcd(a: any, b?: any){
//     if(typeof a === "string" && typeof b === "undefined"){
//         console.log("first abcd");
//     }
//     if(typeof a === "string" && typeof b === "number"){
//         return 12;
//     }
//     else throw new Error("something went wrong");
// }
// abcd("sunny");
// abcd("sunny", 1);
// generic functons, interfaces, classes
function log(a) {
    console.log(a);
}
log("klaus"); // both working
log(12);
function genericInterface(obj) {
    console.log(obj);
}
genericInterface({ name: 'sunny', age: 26 });
// generic classes
class genericClass {
    constructor(name) {
        this.name = name;
    }
}
let b1 = new genericClass("jin");
let b2 = new genericClass(1212);
let b3 = new genericClass(true); // automatically detected no need to specify
console.log(b1, b2, b3);
