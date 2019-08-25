'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var aFunction = require('../internals/a-function');
var anObject = require('../internals/an-object');
var createIteratorProxy = require('../internals/create-iterator-proxy');
var callWithSafeIterationClosing = require('../internals/call-with-safe-iteration-closing');

var IteratorProxy = createIteratorProxy(function () {
  var iterator = this.iterator;
  var result = anObject(this.next.apply(iterator, arguments));
  var done = this.done = !!result.done;
  if (!done) return callWithSafeIterationClosing(iterator, this.mapper, result.value);
});

$({ target: 'Iterator', proto: true, real: true }, {
  map: function map(mapper) {
    return new IteratorProxy({
      iterator: anObject(this),
      mapper: aFunction(mapper)
    });
  }
});
