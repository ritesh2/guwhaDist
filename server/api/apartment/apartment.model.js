'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseAutoIncrement = require('mongoose-auto-increment');

var _mongooseAutoIncrement2 = _interopRequireDefault(_mongooseAutoIncrement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ApartmentSchema = new _mongoose2.default.Schema({
    apartmentId: [{ type: Number, default: 1001, unique: true }],
    name: String,
    active: Boolean,
    address: {
        address1: String,
        address2: String,
        locality: String,
        landmark: String
    },
    city: String,
    pincode: String,
    blocks: [{
        name: String,
        floors: [{
            floorNumber: Number,
            flatNumbers: []
        }]
    }]
});

ApartmentSchema.plugin(_mongooseAutoIncrement2.default.plugin, { model: 'Apartment', field: 'apartmentId', startAt: 1001, incrementBy: 1 });
exports.default = _mongoose2.default.model('Apartment', ApartmentSchema);
//# sourceMappingURL=apartment.model.js.map
