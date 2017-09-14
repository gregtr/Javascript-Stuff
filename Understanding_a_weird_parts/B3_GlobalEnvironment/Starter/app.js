

/// all variables are innitially set to undefined 

//b(); // .... fuck ... Called b! -  by hoisting !!!! fuck yea
//console.log(a); // undefined  
//console.log(c); // error 
/* even without anything - exectuion context was created */
//console.log(this);// 'this'
//console.log(window); // global object ( window) in global context

// execution context - global object, 'this' , outer environment , code

// global - not inside a function

var a = 'Hello world'; // attached to object // a == window.a
//console.log(a);console.log(window.a);
function b() {
    console.log('Called b!');
}

//b(); // return Called b!
//console.log(a); // return Hello world

// creation and 'hoisting' - the execution context

//// hoisting - variables and functions are moved to the topof javascript engine - 
////    - but in real: javascript engine set aside memory space for variables and functions that we;ve created - they exist in memory - entire function is placed to memory space but variables....  but before execution phase ( line by line ) it makes all assigements etc

/**

- 2 phases od creation of execution context

execution context is created ( creation phase ) 
    : global object and this is set up in the memory + outer environment    
        + recognized where we created variables and functions
            - setup memory space for variables and functions ( hoisting ) - declares space for those shits
            
    - execution phase : makes assigements


//// Conceptual aside - javascript and undefined !!!!!!!

*/
var x;
console.log(x); // undefined - special value - that means - variable was not set
if( x === undefined ){
    console.log("undefined - : )");
}

// !!! never do dat shit
var x = undefined; // cus its better to leave it to javascript engine - easier to track that shit