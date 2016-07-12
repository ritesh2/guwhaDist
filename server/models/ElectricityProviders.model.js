'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseAutoIncrement = require('mongoose-auto-increment');

var _mongooseAutoIncrement2 = _interopRequireDefault(_mongooseAutoIncrement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = require('bluebird');


var ElectricityProviders = new _mongoose.Schema({
  providerName: String,
  providerState: String,
  providerUrl: String,
  labelName: String,
  isBillFetchable: Boolean
});

ElectricityProviders.plugin(_mongooseAutoIncrement2.default.plugin, 'ElectricityProviders');
exports.default = _mongoose2.default.model('ElectricityProviders', ElectricityProviders);
//# sourceMappingURL=ElectricityProviders.model.js.map
