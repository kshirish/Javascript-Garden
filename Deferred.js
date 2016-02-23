(function(global) {

    var isArray = function (arr) {
        return Object.prototype.toString.call(arr) === '[object Array]';
    };

    var Deferred = function (beforeStart) {

        var status = 'pending';
        var doneFuncs = [];
        var failFuncs = [];
        var progressFuncs = [];
        var resultArgs;

        // promise object only exposes the methods to attach callbacks furthermore
        // or to determine the state of a promise   
        var promise = {
            done: function() {

                var self = this;

                Array.prototype.map.call(arguments, function(doneCallback) {

                    if( isArray(doneCallback) ) {   // if argument is an Array

                        doneCallback.map(function(fun) {

                            // immediately call the function if the promise has been resolved
                            if (status === 'resolved') {
                                fun(self, resultArgs);
                            }

                            doneFuncs.push(fun);
                        });

                    } else if( typeof doneCallback === 'function' ) {   // if argument is a function

                        // immediately call the function if the promise has been resolved
                        if (status === 'resolved') {
                            doneCallback(self, resultArgs);
                        }

                        doneFuncs.push(doneCallback);
                    }
                });
                
                return this;
            },
            fail: function() {

                var self = this;

                Array.prototype.map.call(arguments, function(failCallback) {

                    if( isArray(failCallback) ) {   // if argument is an Array

                        failCallback.map(function(fun) {

                            // immediately call the function if the promise has been resolved
                            if (status === 'rejected') {
                                fun(self, resultArgs);
                            }

                            failFuncs.push(fun);
                        });

                    } else if( typeof failCallback === 'function' ) {   // if argument is a function

                        // immediately call the function if the promise has been resolved
                        if (status === 'rejected') {
                            failCallback(self, resultArgs);
                        }

                        failFuncs.push(failCallback);
                    }
                });
                
                return this;
            },
            always: function() {
                return this.done.apply(this, arguments).fail.apply(this, arguments);
            },
            progress: function() {

                var self = this;

                Array.prototype.map.call(arguments, function(progressCallback) {

                    if( isArray(progressCallback) ) {   // if argument is an Array

                        progressCallback.map(function(fun) {
f
                            // immediately call the function if the promise has been resolved
                            if (status === 'pending') {
                                fun(self, resultArgs);
                            }

                        });

                    } else if( typeof progressCallback === 'function' ) {   // if argument is a function

                        // immediately call the function if the deferred has been resolved
                        if (status === 'pending') {
                            progressFuncs.push(arguments[i]);
                        }
                    }                    }
                });
                
                return this;
            },
            then: function() {

                // done callbacks
                arguments[0] && this.fail(arguments[0]);

                // fail callbacks
                arguments[1] && this.fail(arguments[1]);

                // notify callbacks
                arguments[2] && this.fail(arguments[2]);
            },
            promise: function(obj) {

                if (obj) {

                    for (var i in this) {
                        if(Object.hasOwnProperty(i)) {
                            obj[i] = this[i];    
                        }
                    }

                    return obj;

                }

                return this;
            },
            state: function() {
                return status;
            },
            isRejected: function() {
                return status === 'rejected';
            },
            isResolved: function() {
                return status === 'resolved';
            }
        };

        // deferred object has the capabilities to alter the state of a promise
        var deferred = {
            resolveWith: function(context, args) {

                if (status === 'pending') {

                    status = 'resolved';
                    args = args || [];
                    resultArgs = args;
                    doneFuncs.map(function(doneFun) {
                        doneFun.apply(context, args);
                    });
                }

                return this;
            },
            rejectWith: function(context, args) {
                if (status === 'pending') {
                    
                    status = 'rejected';
                    args = args || [];
                    resultArgs = args;
                    failFuncs.map(function(failFun) {
                        failFun.apply(context, args);
                    });
                }

                return this;
            },
            notifyWith: function(context, args) {

                if (status === 'pending') {
                    args = args || [];
                    resultArgs = args;
                    progressFuncs.map(function(progressFun) {
                        progressFun.apply(context, args);
                    });
                }

                return this;
            },
            resolve: function() {
                return this.resolveWith(this, arguments);
            },
            reject: function() {
                return this.rejectWith(this, arguments);
            },
            notify: function() {
                return this.notifyWith(this, arguments);
            }
        };

        // extending promise functions into deferred object
        var deferObj = promise.promise(deferred);

        beforeStart && beforeStart.call(deferObj, deferObj)

        return deferObj;
    };

    global.Deferred = Deferred;

})(window);
