'use strict';
var $ = require('../internals/export');
var anObject = require('../internals/an-object');
var createIteratorProxy = require('../internals/create-iterator-proxy');

var IteratorProxy = createIteratorProxy(function () {
  var result = anObject(this.next.apply(this.iterator, arguments));
  var done = this.done = !!result.done;
  if (!done) return [this.index++, result.value];
});

$({ target: 'Iterator', proto: true }, {
  asIndexedPairs: function asIndexedPairs() {
    return new IteratorProxy({
      iterator: anObject(this),
      index: 0
    });
  }
});