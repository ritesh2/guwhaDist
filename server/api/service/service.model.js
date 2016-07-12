'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseAutoIncrement = require('mongoose-auto-increment');

var _mongooseAutoIncrement2 = _interopRequireDefault(_mongooseAutoIncrement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceSchema = new _mongoose2.default.Schema({
  sid: Number,
  name: String,
  info: String,
  active: Boolean,
  packages: [{
    packageId: Number,
    description: String,
    price: Number
  }]
});

_mongooseAutoIncrement2.default.initialize(_mongoose2.default.connection);
ServiceSchema.plugin(_mongooseAutoIncrement2.default.plugin, { model: 'Service', field: 'sId', startAt: 1, incrementBy: 1 });
exports.default = _mongoose2.default.model('Service', ServiceSchema);
//# sourceMappingURL=service.model.js.map
