this; // refers to Window object

function Foo(){}
Foo.bar = function() {
    console.log(this);  // refers to Foo
    function test() {
        console.log();  //refers to Window
    }
    test();
}

var Foo = {
  bar: function() {
    console.log(this);
  }
};
            
Foo.bar();  // this will refer to Foo object
var test = Foo.bar;
test();     //this will refer to Window object



var data = [{name: 'Manish', age: 21}, {name: 'Gaurav', age: 11}];
data.forEach(function(person){
    console.log(this);  // refers to Window Object
})


function Foo(){
  this.bar = 37;
  return {bar:38};
}

o = new Foo();
console.log(o.bar); // logs 38

// call usage
function add(c, d) {
  return this.a + this.b + c + d;
}

var obj = {a:3, b:4};
add.call(obj, 5, 2);    // this in add function will refer to 'obj'

// apply usage
add.apply(obj, [5, 2]);    // this in add function will refer to 'obj'

//bind usage
function f() {
  return this.a;
}

var g = f.bind({a:"qwerty"});
console.log(g());       // qwerty

var o = {a:37, f:f, g:g};
console.log(o.f(), o.g());      // 37, qwerty