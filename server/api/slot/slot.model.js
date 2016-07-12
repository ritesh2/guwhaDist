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


var SlotSchema = new _mongoose2.default.Schema({
  slotId: Number, // 1,2,3,4
  timeFrom: Date, // 10:00            
  timeTo: Date // 11:00
  //  sid       : [{type : Schema.Types.ObjectId, ref : "Service"}],
  //  pid       : [{type : Schema.Types.ObjectId, ref : "Party"}],
}, {
  timestamps: true
});
SlotSchema.index({ date: 1, sid: 1 });
exports.default = _mongoose2.default.model('Slot', SlotSchema);
//# sourceMappingURL=slot.model.js.map
