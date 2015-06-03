# What is JSON-P
> A technique used in JavaScript programs running in web browsers to request data from a server in a different domain, something prohibited by typical web browsers because of the same-origin policy.

## Tell me more about it
- Browsers does not enforce same origin policy on *script* tags 
- But a server must know how to reply with JSONP-formatted results, not any server can do it.
- *JSONP* only supports *GET HTTP* method
- The key here is that response will be given in form of an executable **statement** as below
```
 callMe({"Name": "Foo", "Id": "Bar", "Rank": null});
```

## What's the catch here
- Check the type of *status.json*
![jsonp](https://cloud.githubusercontent.com/assets/5382293/7960316/4fc0c1c0-0a1d-11e5-9b8f-8d268966baea.PNG)

- Content of *status.json* looks like JSON but it is interpreted like a script(similar to jQuery or any other library) by the browser.
![response](https://cloud.githubusercontent.com/assets/5382293/7960317/4fc3a3fe-0a1d-11e5-8fc2-832531b78248.PNG)

So usually, when we make any AJAX call in same domain for response (i.e. JSON, XML etc), it counts as an xhr call. But in case of different domain, it gets downloaded in the form of a document which our browser tries to evaluate, interpret the raw JSON data as a block, and throw a syntax error. Even if the data were interpreted as a JavaScript object literal, it could not be accessed by JavaScript running in the browser, since without a variable assignment, object literals are inaccessible.

## Enough, Let's talk code !
#### Native Js
```
	<script type="text/javascript">
		function callMe(object) {
			console.log('Gotcha!');
			console.log(object);
		}
	</script>
	<script type="application/javascript" src="https://status.github.com/api/status.json?callback=callMe"></script>	
```
#### jQuery
```
<script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>	
	<script type="text/javascript">
		function callMe(object) {
			console.log('Gotcha!');
			console.log(object);
		}
	</script>
	<script type="application/javascript">
		$.ajax({
		    url: "https://status.github.com/api/status.json?callback=callMe",
		    // execute 'callMe' function with response as arguments
		    jsonp: "callMe",
		    // Tell jQuery we're expecting JSONP
		    dataType: "jsonp",
		    success: function( response ) {
		        // you can get response here only when you do not specify above jsonp value
		    }
		});
	</script>	
```

## Still didn't get it?
- Observe this snippet
```
<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.4.min.js"></script>	
```
- Above snippet results in following script added into the html dynamically by the browser
```
// jQuery source code here
```
- And now observe this snippet
```
<script type="text/javascript" src="https://status.github.com/api/status.json?callback=callMe"></script>	
```
- Above snippet results in following script added into the html dynamically by the browser
```
callMe({"Name": "Foo", "Id": "Bar", "Rank": null});
```
- Therefore, imagine it like the other server is reducing our efforts by writing our javascript code.

> Finally, JSONP provides cross-domain access to an existing JSON API, by wrapping a JSON payload in a function call. It is the same old thing that we're doing for ages but didn't notice. And **JSON-P** is the fancy name for it.
