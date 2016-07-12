/**
 * Apartment model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _apartment = require('./apartment.model');

var _apartment2 = _interopRequireDefault(_apartment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ApartmentEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
ApartmentEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _apartment2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    ApartmentEvents.emit(event + ':' + doc._id, doc);
    ApartmentEvents.emit(event, doc);
  };
}

exports.default = ApartmentEvents;
//# sourceMappingURL=apartment.events.js.map
