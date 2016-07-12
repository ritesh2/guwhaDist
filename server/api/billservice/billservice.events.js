/**
 * Billservice model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _billservice = require('./billservice.model');

var _billservice2 = _interopRequireDefault(_billservice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BillserviceEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
BillserviceEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _billservice2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    BillserviceEvents.emit(event + ':' + doc._id, doc);
    BillserviceEvents.emit(event, doc);
  };
}

exports.default = BillserviceEvents;
//# sourceMappingURL=billservice.events.js.map
