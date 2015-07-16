// Airnb's style guide for writing better javascript
// Reference: https://github.com/airbnb/javascript

// Primitives
const foo = 1;
let bar = foo;

bar = 9;

console.log(foo, bar); // => 1, 9

// Complex
const foo = [1, 2];
const bar = foo;

bar[0] = 9;

console.log(foo[0], bar[0]); // => 9, 9

// Avoid `var` use `const` for all your references
// so that you cannot reassign them
// const and let both are block scoped
// Therefore, const provides immutability and block scoping
const WillBeAccessedAndModifiedGlobally = { /* some object */ } // best
let WillBeAccessedAndModifiedGlobally = { /* some object */ } // good
var WillBeAccessedAndModifiedGlobally = { /* some object */ } // bad

// always use literal syntax for creation
// bad
let someStack = new Array();
let someObj = new Object();

// good
let someStack = [];
let someObj = {};


// copy array
const itemsCopy = [...items];

// convert array-like to array
const foos = document.querySelectorAll('.foo');
const nodes = Array.from(foos);

// destructuring
// old way
function getFullName(user) {
	const firstName = user.firstName;
	const lastName = user.lastName;

	return `${firstName} ${lastName}`;
}

// other way
function getFullName(obj) {
	const {
		firstName, lastName
	} = obj;
	return `${firstName} ${lastName}`;
}

// best way
function getFullName({
	firstName, lastName
}) {
	return `${firstName} ${lastName}`;
}

const arr = [1, 2, 3, 4];
const [first, second] = arr; // first: 1, second: 2

function processInput(input) {

	let left = 11,
		top = 13,
		right = 12,
		bottom = 14;
	return {
		left, right, top, bottom
	};
}

// the caller selects only the data they need
console.log(processInput()); // Object {left: 11, right: 12, top: 13, bottom: 14}
const {
	left, right
} = processInput();
console.log(left); // 11
console.log(right); // 12

// Use function declarations insead of expressions
let func = function() {} // func.name is empty
let func = function Well() {} // func.name is `Well`

// arrow IIFE
(() => {

	// statments here ..

})();

// use ... instead of arguments because
// ... is an actual array
function concatenateAll(...args) {
	return args.join('');
}

// bad : A function declaration is not a statement
if (currentUser) {
	function test() {
		console.log('Nope.');
	}
}

// Dot (.) and subscript [] notation
const luke = {
  jedi: true,
  age: 28,
};

// use subscript notation
const num = 28;
const age = luke[num];

// use dot notation 
const isJedi = luke.jedi;

// one `const` per declaration
// bad
const items = getItems(),
    goSportsTeam = true,
    dragonball = 'z';

// good
const items = getItems();
const goSportsTeam = true;
const dragonball = 'z';

// Hoisting + typeof is not reliable :)

// var declarations get hoisted to the top of their scope, their assignment does not.

// we know this wouldn't work (assuming there
// is no notDefined global variable)
function example() {
  console.log(notDefined); // => throws a ReferenceError
}

// var declarations get hoisted to the top of their scope, their assignment does not.
function example() {
   	// var hoisting	
	console.log(declaredButNotAssigned); // => undefined
	var declaredButNotAssigned = true;

	// let hoisting
	let declaredButNotAssigned;
	console.log(declaredButNotAssigned); // => undefined
	declaredButNotAssigned = true;

	// const hoisting
	console.log(declaredButNotAssigned); // => throws a ReferenceError
	console.log(typeof declaredButNotAssigned); // => throws a ReferenceError
	const declaredButNotAssigned = true;
}

// `Function expressions` hoist their variable name, but not the function assignment.
function example() {
  console.log(anonymous); // => undefined

  anonymous(); // => TypeError anonymous is not a function

  var anonymous = function() {
    console.log('anonymous function expression');
  };
}

// `Function declarations` hoist their name and the function body.
function example() {
  superPower(); // => Flying

  function superPower() {
    console.log('Flying');
  }
}

// annotate when require with
// FLAG -- need to figure this out or
// TODO -- need to implement.

// prefix jQuery variable with $
const $container = $('.container');

// When attaching data payloads to events, pass a hash instead of a raw value.
// This allows a subsequent contributor to add more data to the event payload

// bad
$(this).trigger('listingUpdated', listing.id);

// good
$(this).trigger('listingUpdated', { listingId : listing.id });
