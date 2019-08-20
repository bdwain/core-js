var global = require('../internals/global');
var shared = require('../internals/shared-store');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var has = require('../internals/has');
var hide = require('../internals/hide');
var wellKnownSymbol = require('../internals/well-known-symbol');

var USE_FUNCTION_CONSTRUCTOR = 'USE_FUNCTION_CONSTRUCTOR';
var ASYNC_ITERATOR = wellKnownSymbol('asyncIterator');
var AsyncIterator = global.AsyncIterator;
var AsyncIteratorPrototype, prototype;

if (typeof AsyncIterator == 'function') {
  AsyncIteratorPrototype = AsyncIterator.prototype;
} else if (shared[USE_FUNCTION_CONSTRUCTOR] || global[USE_FUNCTION_CONSTRUCTOR]) {
  try {
    // eslint-disable-next-line no-new-func
    prototype = getPrototypeOf(getPrototypeOf(getPrototypeOf(Function('return async function*(){}()')())));
    if (getPrototypeOf(prototype) === Object.prototype) AsyncIteratorPrototype = prototype;
  } catch (error) { /* empty */ }
}

if (!AsyncIteratorPrototype) AsyncIteratorPrototype = {};

if (!has(AsyncIteratorPrototype, ASYNC_ITERATOR)) {
  hide(AsyncIteratorPrototype, ASYNC_ITERATOR, function () {
    return this;
  });
}

module.exports = AsyncIteratorPrototype;