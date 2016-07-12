/**
 * Customer model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _customer = require('./customer.model');

var _customer2 = _interopRequireDefault(_customer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CustomerEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
CustomerEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _customer2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    CustomerEvents.emit(event + ':' + doc._id, doc);
    CustomerEvents.emit(event, doc);
  };
}

exports.default = CustomerEvents;
//# sourceMappingURL=customer.events.js.map
