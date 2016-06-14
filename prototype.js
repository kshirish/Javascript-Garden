function Animal(){}

Animal.eye = 2;     				
Animal.sound = () => 'Animal sound';

Animal.prototype.nose = 1;      	
Animal.prototype.run = () => 'Animal running';

function Dog(){}

// Dog inheriting all the properties and methods within Animal prototype
Dog.prototype = new Animal();   

module.exports.Animal = Animal;
module.exports.Dog = Dog;
