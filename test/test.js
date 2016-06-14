const {Animal, Dog} = require('../prototype');
const assert = require('assert');

describe('prototype-tests', () => {

	it('A dog can\'t access private properties of an Animal', done => {
		
		const d = new Dog();
		assert.equal(typeof d.eye, 'undefined');
		assert.equal(typeof d.sound, 'undefined');
		done();
	});

	it('A dog inherits public properties of an Animal', done => {
		
		const d = new Dog();
		assert.equal(d.run(), 'Animal running');
		assert.equal(d.nose, 1);
		done();
	});

	it('A dog is an instance of an Animal', done => {

		const d = new Dog();
		assert.equal(d instanceof Dog, true);
		assert.equal(d instanceof Animal, true);
		done();
	});
});