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


var UserTransactions = new _mongoose.Schema({
  transactionId: Number,
  userId: Number,
  serviceId: Number,
  billAmount: Number,
  billMonth: Date,
  billDate: Date,
  fetchDate: Date,
  status: String,
  errorCode: String,
  errorMessage: String,
  acknowledgeId: String
});

UserTransactions.plugin(_mongooseAutoIncrement2.default.plugin, { model: 'UserTransactions', field: 'transactionId', startAt: 1, incrementBy: 1 });
exports.default = _mongoose2.default.model('UserTransactions', UserTransactions);
//# sourceMappingURL=UserTransactions.model.js.map
