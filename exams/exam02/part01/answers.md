# Questions and Answers for Exam 2

## Question: Why will the below code not work as intended (unrelated to the url or error handling)?  Include a description on how to fix it (code to help your answer is okay but not required.  A non-code description of how to fix it is required).  Be sure to say _why_ it will not work as the author expected.

```
const data = fetch('example.com/test')
.then( response => response.json() )
.then( json => { 
  return data;
});

console.log(data.cats);
```
### Answer:
 
(answer here)

when we use fetch function to get data from the server of a given url, the then() method returns a Promise,the first 'then' is for handing the data we get from the server API, and transform the data into json, since the Promise object represents the eventual completion(or failure) of an asynchrous operation, thus,the second 'then' of synchronous usage is actually pointless.

And for the console of printing the result of the promise, we also use a corresponding then() to get the data. 

so the code can be modified like this:
----------------------------------------
const data = fetch('example.com/test')
.then( response => response.json() );


console.log(then(data.cats));

----------------------------------------

## Question: What is the scope of a variable in JS?  How does it relate to closures? 

### Answer:
(answer here)

1.scope in JS based on the lexical scope,that means if you don't find in the inner scope, check the outer scope and then check its containing scope.


2.A closure is basically a lexical scope combine a function,and the function can remember and access the lexical scope, even when the function is executed outside of its lexical scope. because it has a reference to the lexical scope, we can call this reference closure.
The advantage of a closure is that it can associated the (lexical scope) with the function that operates on the variable, its like the 'Encapsulation' of Object-Oriented-Programming'. 
A code example of closure:
-----------------------------------------
function foo() {
    var a = 5;
    function bar() {
        console.log( a );
    }
    return bar;
}

var baz = foo();
baz(); // 5 -- this is a closure

-------------------------------------------
code explian:
when foo() execute is done, we think the inner scope of foo() will be disappear,is that true?
Actually, the magical of closure is,it will have a reference point to the inner lexical scope.so the baz also can access the inner scope of the foo();




## Question: What is a polyfill, and how would a polyfill for a new Array function relate to the concept of prototypes? 

### Answer:

(answer here)

1.Because every browser uses a different JavaScript engine, and each has different performance characteristics, each implements a different subset of ES2015 features, and each is approaching full compliance with the spec at different rate.Polyfill is a code library that used to translate code for native APIs that the older browser doesn't support.

Think about that we want to write javascript in ES6 syntax, but how about older browsers that don't support ES6,thus we need polyfill to deal with that problem.
The process is like Write ES6 code --> compile down to ES5 (e.g. Babel) --> send that to the browser.

2. how a polyfill for a new Array function relate to the concept of prototypes?
Because of the Array.prototype property can refer to a Array instance, and we can access the Array constructor to modify the Array prototype, thus we can add/define our own properties and methods.
for example: 
the polyfill is the when we define the prototype of a Array of modify a exist function of a Array
the instance of the Array's prototype chain, will accese this prototype or function.







## Question: What is CORS and why is it only in browsers?  How does it relate to Same Origin Policy (SOP) ?

### Answer: 

(answer here)
1.For security reasons, browsers only allow HTTP request that from the same domian, thus CORS(Cross-Origin Resource Sharing) is used to set addtional HTTP headers to let browsers give permission to the HTTP equest to corss the origin domain to visit server resource.The reason of only in browser is that the browser can enforce the requests are only sent from allowed domains.When the server side restrict the types of allowed requests(like
(1). A response header Access-Control-Allow-Origin which tells the browser the origins allowed to make requests. (2). Access-Control-Allow-Methods which tells the browser the allowed HTTP method 
(3). Access-Control-Allow-Headers which response to a preflight request to indicate which HTTP headers can be used during the actual request).
When the browser is told what origins are allowed it will block future requests from disallowed origins.


2.The same origin policy is used for restrict the request from another origin to access the origin resource. The the same origin must have the same protocol, port, and host. And it maintain the server data access security and make sure the javascript run successfully.For example, you logined in the bank.com website and the attackter inject some script inside the Ad on this bank website, and send a AJAX request to bank.com that contains your name/password indentity, that would be a disaster. The relationship is when CORS is not enabled, a browser will rely on the same origin policy. The browser will only allow requests to the same host as the origin.The CORS is also a security policy that build between browser and server.With CORS and the same origin policy(SOP) a browser will limit the impact of the script injection.




## Question: What is the difference between a bundler and a transpiler?

### Answer:

(answer here)

1.Module bundler is a tool that put code and all its dependencies together in one JavaScript file. They essentially doing the same task of compiling the same code with CommonJS modules into standard browser-friendly JavaScript. Each module is put inside a function within bundle.js and assigned an ID so that it can be loaded as required.
module bundlers for JavaScript today are: Browserify, Webpack, Rollup.js and jspm.

for example : Browserify lets you require('modules') in the browser by bundling up all of your dependencies.
and it gives you access not only to modules that you author, but to npm modules as well.


2.Transpilers,are tools that read source code written in one programming language, and produce the equivalent code in another language. Languages you write that transpile to JavaScript are often called compile-to-JS languages.like CoffeeScript, TypeScript and Babel.
Transpilers let us use new and potential JavaScript features, reliably.
Transpilers contribute to the development of the ECMAScript specification





