'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseAutoIncrement = require('mongoose-auto-increment');

var _mongooseAutoIncrement2 = _interopRequireDefault(_mongooseAutoIncrement);

var _mongooseUniqueValidator = require('mongoose-unique-validator');

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommunitySchema = new _mongoose2.default.Schema({
    active: Boolean,
    communityName: String,
    emailId: { type: String, unique: true, required: true },
    emailVerified: { type: Boolean, default: false },
    phoneNumber: {
        countryCode: String,
        number: String
    },
    communityId: [{
        type: Number,
        default: 1001,
        unique: true
    }],
    address: {
        address1: String,
        address2: String,
        locality: String,
        landmark: String,
        city: String,
        pincode: String
    },
    blocks: [{
        blockName: String,
        floors: [{
            floorNumber: Number,
            flatNumbers: [String]
        }]
    }],

    amenities: [{
        amenityName: String,
        description: String,
        chargePerHour: Number,
        contactPerson: {
            name: String,
            contactPhone: String
        },
        canBeShared: Boolean
    }],

    staff: [{
        staffName: String,
        category: String,
        typeOfStaff: {
            type: String,
            enum: ['PERMANENT', 'CONTRACT']
        },
        workingHours: {
            startTime: Date,
            endTime: Date
        },
        contactNumber: String,
        address: {
            address1: String,
            address2: String,
            locality: String,
            landmark: String,
            city: String,
            pincode: String
        }
    }],
    bankDetails: {
        accountNumber: String,
        beneficiaryName: String,
        bankName: String,
        branchName: String,
        IFSC: String
    }

});
CommunitySchema.plugin(_mongooseAutoIncrement2.default.plugin, {
    model: 'Community',
    field: 'communityId',
    startAt: 1001,
    incrementBy: 1
});

CommunitySchema.plugin(_mongooseUniqueValidator2.default, { message: 'The specified email address {VALUE} is already in use.' });
exports.default = _mongoose2.default.model('Community', CommunitySchema);
//# sourceMappingURL=community.model.js.map
