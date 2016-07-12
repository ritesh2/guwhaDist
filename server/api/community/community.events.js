/**
 * Community model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _community = require('./community.model');

var _community2 = _interopRequireDefault(_community);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommunityEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
CommunityEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _community2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    CommunityEvents.emit(event + ':' + doc._id, doc);
    CommunityEvents.emit(event, doc);
  };
}

exports.default = CommunityEvents;
//# sourceMappingURL=community.events.js.map
