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

var AppointmentSchema = new _mongoose2.default.Schema({
  aId: { type: Number, default: 0, unique: true },
  serviceId: [{ type: Schema.Types.ObjectId, ref: "Service" }],
  customerId: _mongoose2.default.Schema.Types.ObjectId,
  partyId: [{ type: Schema.Types.ObjectId, ref: "Party" }],
  dateFrom: Date,
  dateTo: Date,
  comments: String,
  status: String,
  customerPhoneNo: String,
  partyPhoneNo: String
}, {
  timestamps: true
});

_mongooseAutoIncrement2.default.initialize(_mongoose2.default.connection);
AppointmentSchema.plugin(_mongooseAutoIncrement2.default.plugin, { model: 'Appointment', field: 'aId', startAt: 1, incrementBy: 1 });
exports.default = _mongoose2.default.model('Appointment', AppointmentSchema);
//# sourceMappingURL=appointment.model.js.map
