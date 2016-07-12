/**
 * Service model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _service = require('./service.model');

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
ServiceEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _service2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    ServiceEvents.emit(event + ':' + doc._id, doc);
    ServiceEvents.emit(event, doc);
  };
}

exports.default = ServiceEvents;
//# sourceMappingURL=service.events.js.map
