'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Counters = new _mongoose.Schema({
  _id: String,
  seq: Number
});
// mongoose.Promise = require('bluebird');


exports.default = _mongoose2.default.model('Counters', Counters);
//# sourceMappingURL=counters.model.js.map
