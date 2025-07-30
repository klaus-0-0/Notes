let arr1 = [1,2,3, {name: "sunny"}]
let arr2: string[] = ["sojefosj"];
let arr: [string, number] = ["sun", 25]   //  when things are fixed called tuple


enum companyData {
    code1 = 404,
    code2 = 500,
    code3 = 600
}

companyData.code2

let a: number;
let b: string;

let c: unknown;
c = 12;
c = "string";

if (typeof c === "string")   // in unknown have to specifically clarify before use is it string or number
     c.toUpperCase();

function ok(): number {
    let a = 2+2;
    return a;
}

console.log(ok())

interface user1 {
    name: string,
    email: string,
    pass: string,
    nickName?: string
}

interface user2 extends user1 {          // this is for to add extra data to user1 explictly
    mobileNumber: string
}

function login (obj: user2) {
    // obj.name = "sunny",
    // obj.email = "jin@gmail.com",
    // obj.pass = "dfhksh"
    console.log(obj.name)
}

login({name: "sunny", email: "jin", pass: "sfldljs", mobileNumber: "sfhihihi"});
console.log()


type value = string | number | null;      // creating our own type for multiple types senario called = aliases
let d: value;
d = "sljd"




class bottle {
    public color;                                                               // can right both way but ts way is much easier
    constructor(public name: string, public price: number, color: string) {     // this one easy
        this.color = color;
    }
}

const a1 = new bottle( "milton", 1000, "black");
console.log(a1)


class thisDot {
    name = "sunny";

    ok = ()=>{                       // this is called property method not a function

        let nop = this.name          // to access variable or methods(function) inside other method(functions) we use this.
        return nop
    }
 
    access () {                      // this is called method not function
       let pok = this.name
    }
}

let bb = new thisDot();
bb.ok();
bb.access();


class look {
    public name;                       // both are right this one is old way the parameter name u sending its storing in name
    constructor (name: string){
        this.name = name;
    }

    // constructor (public name: string){     // here public name is not showing but its there
    //     this.name = name;
    // }
}

let qq = new look("pop");


// readonly
class readOnly {
    constructor (public readonly name: string) {
    }

    // use(){
    //     this.name = "sdhcskh"   //  cannote use because its readonly 
    // }

}


// getter setter
class get_Set {
    constructor(public name: string) {}

    get username (){
        return this.name;
    }

    set username (value: string){
        this.name = value;
    }
}

let kk = new get_Set("klaus");
console.log(kk.username)
kk.username = "jin";
console.log(kk.username)



// static
class data{
    static ball = "oo yeah"       // static do not need any instances can use directly 

    static user (){
        return Math.random();
    }
}
console.log(data.ball)
console.log(data.user())


// ...rest / ...spread

function dot (...arr: number[]){     // ...rest operator to put all parameter at once 
    console.log(arr);
}
dot(1,2,3,4,5,6,7,8,9,10);

let array = [1,2,3,4,5];
let array1 = [...array];             // ...spread operator to copy
console.log(array1)


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
function log<T>(a: T){
    console.log(a);
}
log<string>("klaus");                  // both working
log(12);

// generi interface 
interface data1<T> {
    name: string,
    age: T
}
function genericInterface (obj: data1<number>){
    console.log(obj)
}
genericInterface({name:'sunny',age: 26});

// generic classes
class genericClass<T> {
    constructor(public name: T){}
}
let b1 = new genericClass<string>("jin")
let b2 = new genericClass<number>(1212)
let b3 = new genericClass(true)            // automatically detected no need to specify
console.log(b1, b2, b3)