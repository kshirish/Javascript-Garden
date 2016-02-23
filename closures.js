function Counter(start) {
    var count = start;
    return {
        increment: function() {
            count++;
        },

        get: function() {
            return count;
        }
    }
}

var foo = Counter(4);
foo.increment();
foo.get(); // 5


//closures within a loop

for(var i = 0; i < 10; i++) {
    (function(e) {
        setTimeout(function() {
            console.log(e);  
        }, 1000);
    })(i);
}

//an alternative way
for(var i = 0; i < 10; i++) {
    setTimeout(console.log.bind(console, i), 1000);
}

// Contructors
function Foo() {
    this.bar  = 55;     // no explicit return
}

new Foo();      // 'this' will be returned

function Foo() {
    return 55;          // explicit return of a non-object
}

new Foo();          // new object will be returned

function Foo() {
    return {bar : 55}       // explicit return of an object
}

new Foo();          // {bar: 55} will be returned