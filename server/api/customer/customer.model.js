'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseAutoIncrement = require('mongoose-auto-increment');

var _mongooseAutoIncrement2 = _interopRequireDefault(_mongooseAutoIncrement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var CustomerSchema = new _mongoose2.default.Schema({
  cId: { type: Number, default: 0, unique: true },
  apartmentId: [{ type: Schema.Types.ObjectId, ref: "Apartment" }],
  apartmentBlockId: [{ type: Schema.Types.ObjectId, ref: "Apartment.blocks" }],
  firstName: String,
  lastName: String,
  mobileNumber: String,
  emailId: String,
  Address: String,
  active: Boolean

});

_mongooseAutoIncrement2.default.initialize(_mongoose2.default.connection);
CustomerSchema.plugin(_mongooseAutoIncrement2.default.plugin, { model: 'Customer', field: 'cId', startAt: 1, incrementBy: 1 });

exports.default = _mongoose2.default.model('Customer', CustomerSchema);
//# sourceMappingURL=customer.model.js.map
