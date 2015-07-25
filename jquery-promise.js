// Deferred Object vs Promise
// A deferred object is an object than can create a promise and change its state to resolved
// or rejected. Deferreds are typically used if you write your own function and want to provide a promise to the calling code. You are the producer of the value.

// A promise is, as the name says, a promise about a future value. You can attach callbacks to it to get that value. The promise was "given" to you and you are the receiver of the future value.
// You cannot modify the state of the promise. Only the code that created the promise can change its state.

function callMe() {

    var d = new $.Deferred();

    setTimeout(function() {
        // job of Deferred: to resolve/reject the promise
        d.resolve('some_value_compute_asynchronously');
    }, 1000);

    // job of Deferred: to provide promise
    return d.promise();
}

// job of a promise: to attach callbacks
callMe().done(function(value) {
    alert(value);
});

// returns a chainable object which can register, invoke callbacks depending upon success and failure.
var defer = $.Deferred();

// return a promise object
defer.promise();

// return promise when all the animations have ended
var div = $("<div>");
div.promise().done(function(arg1) {
    // Will fire right away and alert "true"
    alert(this === div && arg1 === div);
});

// $.when: returns a promise object
var effect = function() {
    return $("div").fadeIn(800).delay(1200).fadeOut();
};

$.when(effect()).done(function() {
    $("p").append(" Finished! ");
});

// $.when: multiple deferreds
// resolves when each callback is resolved
// rejects when even one callback is rejected

// example 1:
var d1 = $.Deferred();
var d2 = $.Deferred();
var d3 = $.Deferred();

$.when(d1, d2, d3).then(function(v1, v2, v3) {
    console.log(v1); // v1 is undefined
    console.log(v2); // v2 is "abc"
    console.log(v3); // v3 is an array [ 1, 2, 3, 4, 5 ]
}, function() {
    console.log('failed');
});


d1.resolve();
d2.resolve("abc");
d3.resolve(1, 2, 3, 4, 5);

// example 2:
var d1 = $.Deferred();
var d2 = $.Deferred();
var d3 = $.Deferred();

$.when(d1, d2, d3).then(function(v1, v2, v3) {
    console.log(v1);
    console.log(v2);
    console.log(v3);
}, function() {
    console.log('failed'); // failed
});


d1.resolve();
d2.reject("abc");
d3.resolve(1, 2, 3, 4, 5);

// example 3: 
// Execute the function myFunc when both ajax requests are successful, or myFailure if either one has an error.
$.when($.ajax("/page1.php"), $.ajax("/page2.php"))
    .then(myFunc, myFailure);


$.get("test.php").always(function() {
    console.log("gets executed every singletime !");
});

// done method
// 3 functions to call when the Deferred object is resolved

// Create a deferred object
var dfd = $.Deferred();
var finalString = '';

function fn1() {
  finalString += '1 ';
}
function fn2() {
  finalString += '2 ';
}
function fn3( n ) {
  finalString += '3 ';
}
 
// Add handlers to be called when dfd is resolved
dfd
// .done() can take any number of functions or arrays of functions
.done([fn1, fn2], fn3, [fn2, fn1])
// We can chain done methods, too
.done(function(n) {
    finalString += n + " we're done.";
})
.done(function() {
    console.log('Final String: ' + finalString);
});

dfd.resolve("and");

