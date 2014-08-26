// to convert boolean and an array to string
false.toString(); 
[1, 2, 3].toString(); 

// a function can have properties as well as methods so do an object
function Foo(){}
Foo.bar = 1;
Foo.show = function(){
    console.log('This is show-off');
}

var Foo = {};
Foo.bar = 1;
Foo.show = function(){
    console.log('This is show-off');
}

// to convert number to string
(2).toString();

//-----------------------------------------------------------------------------------------------------

var obj = {name: 'Gaurav', age: 21, city: 'Banglore', state: 'Karnataka'};

// two ways of accessing a propeerties
obj.name;         //Gaurav
obj.city;        //Banglore
obj['age'];      //21
obj['state'];   //Karnataka

// to remove properties
obj.name = undefined;       //only removes the value
delete obj.name;            // removes both key as well the value

// to check whether a property exists or not
obj.hasOwnProperty('name'); //false
obj.hasOwnProperty('age'); //true

