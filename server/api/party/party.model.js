'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseAutoIncrement = require('mongoose-auto-increment');

var _mongooseAutoIncrement2 = _interopRequireDefault(_mongooseAutoIncrement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PartySchema = new _mongoose2.default.Schema({
  pId: { type: Number, default: 0, unique: true },
  firstName: String,
  lastName: String,
  mobileNumber: String,
  emaiId: String,
  serviceIds: { type: String, default: [] },
  address: {
    address1: String,
    address2: String,
    locality: String,
    landmark: String
  },
  city: String,
  pincode: String,
  active: Boolean
});

_mongooseAutoIncrement2.default.initialize(_mongoose2.default.connection);
PartySchema.plugin(_mongooseAutoIncrement2.default.plugin, { model: 'Party', field: 'pId', startAt: 1, incrementBy: 1 });

exports.default = _mongoose2.default.model('Party', PartySchema);
//# sourceMappingURL=party.model.js.map
