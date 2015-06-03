

var asyncFun = function(someUrl, resolve, reject) {

    $.get(someUrl)
        .done(function(response) {

            if(response) {
                resolve(response);
            } else {
                reject('Empty Response');
            }
        })
        .error(function(response) {

            reject('Empty Response');

        });

};

var getPromise = function(someUrl) {

    return new Promise(function(resolve, reject) {

        asyncFun(someUrl, resolve, reject);  // do some async

    });
};

var addHtmlToPage = function(html) {

    console.log('Below HTML added to page!');
    console.log(html);
};

function *generatorFun() {

    var path = 'http://www.html5rocks.com/en/tutorials/es6/promises/';
    var stories = yield getPromise(path + 'story.json');

    stories.chapterUrls.forEach(function(chapterUrl) {
                
        yield getPromise(path + chapterUrl);

    });

}

function runGenerator() {
    var it = generatorFun();
    var stories;

    it.next().then(function(stories) {
        console.log(stories);
        return it.next(stories);
    }).then(function(chapter) {
        console.log(chapter);
        return it.next();
    }).then(function(chapter) {
        console.log(chapter);
        return it.next();
    }).then(function(chapter) {
        console.log(chapter);
        return it.next();
    }).then(function(chapter) {
        console.log(chapter);
        return it.next();
    }).then(function(chapter) {
        console.log(chapter);
    });
    

}

runGenerator();

var path = 'http://www.html5rocks.com/en/tutorials/es6/promises/';

if(window.Promise) {

    // Chaining Promises : The tricky part is that when you return a simple value inside then(),
    // the next then() is called with that return value. But if you return a Promise inside then(), 
    // the next then() waits on it and gets called when that Promise is settled.
    
    getPromise('http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139')   
        .then(function(result) {

            console.log(result); // response object

            return getPromise('http://api.icndb.com/jokes/random');

        }).catch(function(err) {

            console.log(err); // 'Empty Response'

            return getPromise('http://api.icndb.com/jokes/random');

        }).then(function(result) {

            console.log(result); // response object

            return 10;

        }).then(function(result) {

            console.log(result); // response object

            return -1;

        }).then(function(result) {

            console.log(result); // response object

            return 13;

        }).then(function(result) {

            console.log(result); // response object

            return getPromise('http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139');

        }).then(function(result) {

            console.log(result); // response object

        }).catch(function(err) {

            console.log(err); // 'Empty Response'

        });


    // Error handling    
    new Promise(function(resolve, reject) {

        resolve({name:'whatever', age: 0});

    }).then(function(data) {

        console.log('It worked!', data);    // It worked! {name:'whatever', age: 0}
        JSON.parse('invalid JSON');         // Error occured

    }).catch(function(err) {

        console.log('It failed!');          // It failed!

    }).then(function(data) {

        console.log('Came here as Well');   // Came here as Well           
    });

    // Async in loop : Sequence
    var promiseSequence = getPromise(path + 'story.json');

    promiseSequence
        .then(function(result) {

            console.log(result); // response object

            result.chapterUrls.forEach(function(chapterUrl) {
                
                // Add these actions to the end of the sequence
                promiseSequence = promiseSequence.then(function() {

                    return getPromise(path + chapterUrl);

                }).then(function(chapter) {

                    addHtmlToPage(chapter.html);
                });
            });

        });

    // Now is the time to try ALL
    var arrayOfPromises = [
        getPromise('http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139'),
        getPromise('http://api.icndb.com/jokes/random'),
        getPromise('http://api.openweathermap.org/data/2.5/weather?lat=135&lon=19'),
        getPromise('http://api.icndb.com/jokes/random'),
        getPromise('http://api.openweathermap.org/data/2.5/weather?lat=15&lon=29'),
        getPromise('http://api.icndb.com/jokes/random'),
        getPromise('http://api.openweathermap.org/data/2.5/weather?lat=13&lon=90'),
        getPromise('http://api.icndb.com/jokes/random'),
        getPromise('http://api.icndb.com/jokes/random')
    ];    

    Promise.all(arrayOfPromises).then(function(arrayOfResults) {
    
        console.log('All Promises got resolved!');              // All Promises got resolved!
        console.log(arrayOfResults);

    }).catch(function(err) {

        console.log('Atleast one of them died on the way!');          // Atleast one of them died on the way!

    });    

    // Let's Race
    // Source : Mozilla Dev 
    // Description : Whatever resolves/rejects first will be returned
    
    var p1 = new Promise(function(resolve, reject) { 

        setTimeout(resolve, 500, "one"); 
    });

    var p2 = new Promise(function(resolve, reject) { 

        setTimeout(resolve, 100, "two"); 
    });

    Promise.race([p1, p2]).then(function(value) { console.log(value); });   // "two"

    var p3 = new Promise(function(resolve, reject) { 

        setTimeout(resolve, 100, "three");
    });

    var p4 = new Promise(function(resolve, reject) { 

        setTimeout(reject, 500, "four"); 
    });

    Promise.race([p3, p4]).then(function(value) {

      console.log(value); // "three"
    }, function(reason) {
      // Not called
    });

    var p5 = new Promise(function(resolve, reject) { 

        setTimeout(resolve, 500, "five"); 
    });

    var p6 = new Promise(function(resolve, reject) { 

        setTimeout(reject, 100, "six");
    });

    Promise.race([p5, p6]).then(function(value) {
      // Not called              
    }, function(reason) {

      console.log(reason); // "six"
    });

    // Recipe of the day: Generators and Promises
    
}
