//	GoodParts.js - Doglous Crokford 
//	Written in May 2008
//  It's been a long time since I had a hands on experience.
//	I had a few not long ago, but those were painful.

var ToDoClass = function(title) {
    this.title = title;
    this.active = this.complete = false;
};

ToDoClass.prototype.activated = function() {
    this.active = true;
};

ToDoClass.prototype.completed = function() {
    this.complete = this.active;
};

ToDoClass.prototype.reset = function() {
    this.active = this.complete = false;
};

ToDoClass.prototype.renamed = function(rename) {
    this.title = rename;
};

var ToDoManager = function() {
    this.ToDoList = []; 
};

ToDoManager.prototype.getAll = function() {
    return this.ToDoList;
};

ToDoManager.prototype.getActivated = function() {
    return this.ToDoList.filter(function(value){
        return value.active;
    });
};

ToDoManager.prototype.getCompleted = function() {
    return this.ToDoList.filter(function(value){
        return value.complete;
    });
};

ToDoManager.prototype.create = function(todo) {
    var errorCheck;

    // cannot have same title
    this.ToDoList.map(function(value){
        if( value === todo.title ) { errorCheck = true; }
    });

    !errorCheck && this.ToDoList.push(todo);
};

ToDoManager.prototype.delete = function(todo) {
    this.ToDoList = this.ToDoList.filter(function(value){
        return value !== todo.title;
    });
};

ToDoManager.prototype.edit = function(todo,action,rename) {
    switch(action){
        case 'ACTIVE'   :   todo.activated(); break;
        case 'COMPLETE' :   todo.completed(); break;
        case 'RENAME'   :   todo.renamed(rename); break;
        default         :   todo.reset();
    };
};


var first = new ToDoClass('first');
var second = new ToDoClass('second');
var third = new ToDoClass('third');
var fourth = new ToDoClass('fourth');

var manager = new ToDoManager();

// add some
manager.create(first);
manager.create(second);
manager.create(fourth);

// activate some
manager.edit(second,'ACTIVE');
manager.edit(first,'ACTIVE');

// add some more
manager.create(third);

// complete some
manager.edit(second,'COMPLETE');
manager.edit(third,'COMPLETE');

// get status
manager.getAll();
manager.getActivated();
manager.getCompleted();

// reset some
manager.edit(second,'RESET');
manager.edit(fourth,'RESET');
manager.edit(third,'RESET');

// Object.create 
if (typeof Object.create !== 'function') {
	Object.create = function (o) {
		var F = function () {};
		F.prototype = o;
		return new F();
	};
}

// delete 
var t = {}

t.toString = function(){console.log('Do nothing');}
t.toString();	// Do nothing

delete t.toString	// true
t.toString()	// "[object Object]"

// paramater accessible to lowest level function
(function (a) {
    console.log('OUTER');   
    (function () {
        console.log('INNER');
        (function (){
            console.log( a + ' Here???' );
        })();   
    })();
})('Ray');

// Invocation Patterns
value = 7;

var obj = {
    value: 0,
    increamentByOne: function() {
        this.value += 1;    //  The Method Invocation Pattern
        (function SomeInnerFunction() {
            this.value += 1;    // The Function Invocation Pattern         
        })();
    }
};

obj.increamentByOne();

var Quo = function (string) {
    this.status = string;   //  The Constructor Invocation Pattern
};

// Walk Over DOM
var walk_the_DOM = function(node, func) {
	func(node);
	node = node.firstChild;
	while (node) {
		walk_the_DOM(node, func);
		node = node.nextSibling;
	}
};

var getElementsByAttribute = function (att, value) {
	var results = [];
	walk_the_DOM(document.body, function (node) {
		var actual = node.nodeType === 1 && node.getAttribute(att);
		if (typeof actual === 'string' && (actual === value || typeof value !== 'string')) {
			results.push(node);
		}
	});
	return results;
};

// add handlers in a loop : first way
var add_the_handlers = function (nodes) {
	var i;
	for (i = 0; i < nodes.length; i += 1) {
		nodes[i].onclick = function (i) {
			return function (e) {
				alert(e);
			};
		}(i);
	}
};

// the second way
var add_the_handlers = function (nodes) {
	var i;
	[].map.call(nodes, (function(value,index) {
       value.onclick = function (e) {	
			alert(index);	
	   }; 
	}));
};

// Prototypical Inheritance
// __proto__ of an instance will always point towards
// prototype of its Creator/Class

var t = function() {};
t.__proto__ = Function.prototype	// true

// If 'new' would have been a function  
Function.prototype.new = function ( ) {
	// Create a new object that inherits from the
	// constructor's prototype.
	var that = Object.create(this.prototype);
	var other = this.apply(that, arguments);

	return (typeof other === 'object' && other) || that;
}

// Inherit
Function.prototype.inherits = function (Parent) {
	var p = new Parent( );

    for(var i in p) {
        if(p.hasOwnProperty(i)) {
            this.prototype[i] = p[i];
        }
    }

	return this;
}

function Animal(type) {this.type = type || 'social';}
Animal.prototype.eat = function() {console.log('I eat.');}
function Person(name) {this.name = name;}
Person.prototype.age = 18;

Person.inherits(Animal);
var adult = Person.new('Ray');	//	Object {name: "Ray", age: 18}

// Private Variables
function Validator() {
	var secret = {
		username: 'Ray',
		password: 'Strong'
	};

	return {
		signIn: function( uname,pass ) {
			return	console.log( secret.username === uname &&  secret.password === pass ?
			'Login Successful' : 'Login Failed' );
		}
	};
}

Validator().signIn('Ray','$$Weak$$');

// Sad but True

function A(){}

var a = new A()
a.constructor	        // function A(){}
A.prototype.constructor // function A(){}
A.constructor	        // function Function() { [native code] }

function B(){}

B.prototype.constructor // function B(){}
B.prototype = new A()
B.prototype.constructor	// function A(){}
B.constructor	// function Function() { [native code] }

var b = new B()
b.constructor	// function A(){}

// Eventuality ??
var eventuality = function(that) {
    var registry = {};

    that.fire = function(event) {
        var array,
            func,
            handler,
            i,
            type = typeof event === 'string' ? event : event.type;

        if (registry.hasOwnProperty(type)) {
            array = registry[type];
            for (i = 0; i < array.length; i += 1) {
                handler = array[i];
                func = handler.method;
                if (typeof func === 'string') {
                    func = this[func];
                }
                func.apply(this, [handler.parameters] || [event]);
            }
        }
        return this;
    };

    that.on = function(type, method, parameters) {

        var handler = {
            method: method,
            parameters: parameters
        };

        if (registry.hasOwnProperty(type)) {
            registry[type].push(handler);
        } else {
            registry[type] = [handler];
        }
        return this;
    };

    return that;
};

// button
var button =  {name: 'button'};
eventuality(button);
button.on('click','greeting', 'Ray');
button.greeting = function(x) {console.log('Hi,'+x);}
button.fire('click');

// another button
var anotherButton =  {name: 'anotherButton'};
eventuality(anotherButton);
anotherButton.on('click','curse', 'Larry');
anotherButton.curse = function(x) {console.log('Loser,'+x);}
anotherButton.fire('click');

// Mixed Array
var misc = ['string', 98.6, false, null, undefined, ['nested', 'array'], {isObj: true}, NaN, Infinity];
misc.length // 10

// Object or Array
var obj = {length:3}
var arr = ['a','aa']

obj.propertyIsEnumerable('length')	// true
arr.propertyIsEnumerable('length')	// false

arr instanceof Object;  // true
arr instanceof Array;	// true
obj instanceof Array;	// false


// Array reduce
Array.prototype.myReduce = function (f, value) {
	var i;
	for (i = 0; i < this.length; i += 1) {
		value = f(this[i], value);
	}
	return value;
};

var arr = [1,2,3,4,5];
var add = function(a,b){return a+b;}
var multiply = function(a,b){return a*b;}
arr.myReduce(add,0);		// 15
arr.myReduce(multiply,1);	// 120

// The `__proto__` game

var Animal = function(type) { this.type = type; };
Animal.prototype.isScary = function() { return this.type === 'Snake' };

var Person = function(city) { this.location = city; };
Person.prototype = new Animal();

var Man = function() { this.gender = 'M'; };
Man.prototype = new Person();
var m = new Man()

m instanceof Man        // true
m instanceof Person     // true
m instanceof Animal     // true

m.constructor

m.__proto__
m.__proto__.__proto__
m.__proto__.__proto__.__proto__
m.__proto__.__proto__.__proto__.__proto__

//**	I happily skipped the RegEX CHAPTER		**//
//**		And The AWFUL Parts as Well			**//

