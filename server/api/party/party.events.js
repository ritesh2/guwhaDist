/**
 * Party model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _party = require('./party.model');

var _party2 = _interopRequireDefault(_party);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PartyEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
PartyEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _party2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    PartyEvents.emit(event + ':' + doc._id, doc);
    PartyEvents.emit(event, doc);
  };
}

exports.default = PartyEvents;
//# sourceMappingURL=party.events.js.map
