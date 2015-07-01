Javascript Garden
=================

This is just a bunch of snippets accumulated from here and there, that might help you improving basics. 

1.  https://bonsaiden.github.io/JavaScript-Garden/
2.  https://developer.mozilla.org
3.  Javascript - The Good Parts By Doglous Crockford

### e.stopPropagation() vs e.stopImmediatePropagation() vs e.preventDefault()
```html
<div>
    <button>press</button>
</div>
```

```javascript
var kid = document.getElementsByTagName('button')[0];
var dad = document.getElementsByTagName('div')[0];

kid.addEventListener('click', function(e) {
    console.log('kid here');
    return false;
    // e.preventDefault();
    // e.stopPropagation();
    // e.stopImmediatePropagation();
});

kid.addEventListener('click', function(e) {
    console.log('neighbour kid here');
});

dad.addEventListener('click', function(e) {
   console.log('dad here');
});

dad.addEventListener('click', function(e) {
   console.log('neighbour dad here');
});
```

*Edit on fiddle here*: http://jsfiddle.net/7jquh3go/
