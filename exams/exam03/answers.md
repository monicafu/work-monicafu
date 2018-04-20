# Questions and Answers for Exam 3

## Question:  Why do I say that JS does not actually have 'classes'?  What is the distinction between a language with (real) classes and a language without?

### Answer:
 
(answer here)
1.Although javaScript classes are introduce in ES6 version, but it just a syntactical sugar over javaScript's existing prototype-based inheritance，providing an alternative way to create objects and deal with inheritance.
It not a actually 'classes', because the syntax don't contain a object-oriented inheritance model, and the 'classes' are actually 'special functions'.
2.(1)a language with real class is class-based programming language(like JAVA,C++),object is a entity with data/variable and behavior/method,the class is defined as a blueprint and the object must explicitly created/instantiated based on the class.
In class-based languages, a new instance is constructed through a class's constructor function, a special function that reserves a block of memory for the object's members (properties and methods) and returns a reference to that block. 
; (2)a language without class is a prototype-based programming language (like Self,javaScript).n prototype-based languages there are no explicit classes.
 Objects inherit directly from other objects through a prototype property.There are two methods of constructing new objects: "from nothing" object creation or through cloning an existing object. 


## Question:  Why is it a bad idea to directly modify the DOM when using React?

### Answer:
 
(answer here)
Because directly manipulating the DOM is really hard to manage and inefficient, React has its own mechanism of manipulating DOM, for every DOM object, there is a corresponding "virtual DOM object." A virtual DOM object is a representation of a DOM object.
React can compare state change，and the changed objects only get updated on the realDOM,it can update only the necessary parts of the DOM, manipulating the virtual DOM is much faster, because nothing gets drawn onscreen.



## Question:  What is composition, and why is it often favored over inheritance?

### Answer:
 
(answer here)
1.In Object-oriented Design/Programming,composition is a kind of association where the composite object has sole responsibility for the disposition of the component parts. 
In simple words, composition refers to combining simple types to make more complex ones.The components is "has a" relationship. 

2.composition favored over inheritance: 
Inheritance is when a object or class is based on another object or class.And inheritance established "is a" relationship.

Composition favored over inheritance is a principle of OOP to achieve polymorphism and code reuse, because inheritance should be used when the classes form a strict hierarchy, where subclasses are their parent classes in every sense of the word. 
And inheritance breaks encapsulation, by inheriting from a class, you're coupling yourself closely with the parent class. 
but composition gives more flexibility, it's more dynamic and more interaction between classes happens in run-time,you can implementation of class at run-time by changing included object, 
thus changing behavior of it, but you can't do this with inheritance, you can't change behavior of base class at run-time.
And a design based on object composition usually will have less classes.Also there is no conflict between methods/properties names, which might occur with inheritance.

## Question:  Why can code using 'import' not be run directly by NodeJS?  

### Answer:
 
(answer here)
Because the 'import' is comes from ES6,and ES6 modules are loaded, resolved and evaluated asynchronously,is the fact that the shape (the API) of a CommonJS module cannot be determined until after the code is evaluated 
— and even after evaluation, the shape can be mutated by other code at any time. 
However,Node.js has had a module system that is derived from a fairly loosely defined specification called “CommonJS”,which synchronously loads,parses and compiles the JavaScript code, and also synchronously evaluates the code.
So the ES6 modules are asynchronously,but commonJS is synchronously, and this is the reason 'import' not be run directly by Node js.


## Question:  Why can code using 'import' or 'require' not be run directly in most browsers?

### Answer:
 
(answer here)
Because in browsers, there are two different kinds of entities: scripts and modules. They have slightly different syntax and work differently.
Scripts are normally loaded or executed synchronously. The JavaScript thread stops until the code has been loaded or executed.
but all modules are load asynchronously, before the body is executed.

'import' is from Asynchronous Module Definition (AMD) – AMD is designed to load modules asynchronously
'require' is from CommonJS – CommonJS is a module format designed to load modules synchronously
However AMD and CommonJS are de facto standards rather than built-in language standards, and are not natively supported in browsers

## Question:  What is a 'side-effect'?  Why do we want to minimize them?

### Answer:
 
(answer here)
1.A side effect is any application state change that is observable outside the called function other than its return value.
For example, if you are using Babel when switching to a native ES6 modules implementation, you may have side-effects.
2.Side effects are mostly avoided in functional programming, which makes the effects of a program much easier to understand, and much easier to test.
because when we separate side effects from the rest of program logic, the software will be much easier to extend, refactor, debug, test, and maintain.
This is the reason that most front-end frameworks encourage users to manage state and component rendering in separate, loosely coupled modules.
