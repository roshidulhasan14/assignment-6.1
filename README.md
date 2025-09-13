


## 1. What is the difference between `var`, `let`, and `const`?

 **var**
  - Function-scoped or globally scoped.
  - Can be re-declared and updated.
  - Gets hoisted (accessible before declaration with `undefined`).

 **let**
  - Block-scoped (works only inside `{ }`).
  - Can be updated but **cannot** be re-declared in the same scope.
  - Also hoisted but not initialized (cannot be used before declaration).

 **const**
  - Block-scoped.
  - Must be initialized at declaration.
  - Cannot be re-assigned, but objects/arrays declared with `const` can have their properties modified.

Re-declaration	
==Can be re-declared within the same scope without an error. This can lead to bugs by unintentionally overwriting a variable.	
==Cannot be re-declared within the same scope. Attempting to do so will throw a SyntaxError.	==Cannot be re-declared within the same scope.


## 2. What is the difference between `map()`, `forEach()`, and `filter()`?

 **map()**
  - Returns a **new array** with the results of applying a function on every element.
  - Useful for transforming data.

 **forEach()**
  - Executes a function for each element.
  - Does **not** return a new array (always returns `undefined`).
  - Used for side effects like logging or updating values.

 **filter()**
  - Returns a **new array** containing elements that pass a condition.
  - Useful for selecting a subset of data.

  Return Value	
  ==Returns a new array of the same length as the original, populated with the results of the callback function.	
  ==Returns undefined. It does not create or return a new array.	
  ==Returns a new array containing a subset of the original array's elements.


## 3. What are arrow functions in ES6?

- Arrow functions provide a shorter syntax for writing functions.  
- They do **not** have their own `this` context, instead they use the `this` value of their enclosing scope. 

Arrow functions provide a shorter, more concise syntax for writing function expressions in ES6. They differ from traditional functions in a few key ways:

Concise Syntax: For simple functions, you can omit the function keyword, curly braces ({}), and the return keyword.
 

// Regular function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;


4. How does destructuring assignment work in ES6?
Destructuring allows unpacking values from arrays or properties from objects into separate variables.
== Destructuring assignment is a JavaScript expression that makes it possible to unpack values from arrays or properties from objects into distinct variables. It provides a cleaner, more readable way to extract data.

Array Destructuring
With array destructuring, you can assign elements of an array to variables in a single expression.

Object Destructuring
With object destructuring, you can extract properties from an object and assign them to variables with matching names.

// Array destructuring
const numbers = [10, 20, 30];
const [a, b] = numbers;
console.log(a, b); // 10, 20

// Object destructuring
const person = { name: "Alice", age: 25 };
const { name, age } = person;
console.log(name, age); // Alice, 25


5. Explain template literals in ES6. How are they different from string concatenation?
Template literals use backticks (`) instead of quotes.

They allow:
==  Template literals are a modern way to handle strings in ES6. They are enclosed by backticks (`) instead of single (') or double (") quotes and offer three major advantages over traditional string concatenation.

String interpolation with ${}.

Multiline strings without \n.

Easier readability.

== Allows for direct, inline embedding of expressions and variables using the ${expression} syntax. This is known as string interpolation.
== Requires using the + operator to join strings and variables together.


const name = "Bob";
const age = 30;

// Concatenation
console.log("My name is " + name + " and I am " + age + " years old.");

// Template literal
console.log(`My name is ${name} and I am ${age} years old.`);

✅ Difference:

Concatenation requires + operators.

Template literals are cleaner, support variables directly, and allow multiline strings.


------

