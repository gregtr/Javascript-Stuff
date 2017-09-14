/* Big words and javascript 

    Big word: definition - thy're not scary as they sound

Understanding, frameworks, and the WEIRD parts 
    !!! We need to understand how javascript work's - fundamental knowledge
    will come in handy when we encounter something bizzare 
        - plenty of "AHAAAA" moments !!!
        
        jQuery, AngularJS - framework's of javascript - just javascript code developed by smart developers - but most of javascript developer's won't understand those frameworks - cus they don't understand javascript enough
*/

/* Conceptual aside - additional information loosely related to javascript */
// Syntax parsers
// execution contexts and lexical environments


    // Syntax parsers:
/* 
    a program that reads your code and determines what it does and if its grammar is valid
    
    
    myCode -(compiler/interpreter) program converts to machine code - we get translation of it 
*/

    // Lexical environment:
/*
    where something sits physically in the code you write - 
    lexical means having to do with words or grammar. A lexical environment exitst in programming language in which where you write something is important


    my code - in languages lexically important - what we see helps us determine where it will be in computer memory
*/

    // Execturion context:
/*
    a wrapper to help manage the code that is running 
    
    there are lots of lexical environments. Which one is currentyl runnning is managed via execution contexts. it can contain things beyond what you.ve written in your code
    
    // my code after translation can have more stuff that i only wrote - like generates aditional code 
*/

// Conceptyual aside
// name /value pairs and objects
    // name/value pari : a name whcich maps to a unique value
    // name can be defined more than once but only can have one value in any execution context
// value can be more name/value pairs;

// object -0 collection of name value pairs - javascript 
/*
    Addres {
        stress: "main",
        Number : 100,
        Apartment: {
            Floor: 3,
            Number : 301
        }
    }
*/

/* Global envirooment and global context 


    GLOBAL - execution context - a global wrapper for whole javascript program 
    // more than one :D often 

    Global ( base execution context )
        - creates 2 things - global object, and special variable 'this'
*/
