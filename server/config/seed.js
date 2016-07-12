/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var _thing = require('../api/thing/thing.model');

var _thing2 = _interopRequireDefault(_thing);

var _user = require('../api/user/user.model');

var _user2 = _interopRequireDefault(_user);

var _ElectricityProviders = require('../models/ElectricityProviders.model');

var _ElectricityProviders2 = _interopRequireDefault(_ElectricityProviders);

var _slot = require('../api/slot/slot.model');

var _slot2 = _interopRequireDefault(_slot);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//ElectricityProvider.find({}).remove()
//  .then(() => {
//    ElectricityProvider.create({
//        providerName: 'Electricity Bill',
//        providerState: 'Andhra Pradesh',
//        providerUrl: 'www.google.com',
//        labelName: 'Unique Service No',
//        isBillFetchable: 1
//    });
//  });
//User.find({}).remove()
//  .then(() => {
//    User.create({
//      provider: 'local',
//      name: 'Test User',
//      email: 'test@example.com',
//      password: 'test'
//    }, {
//      provider: 'local',
//      role: 'admin',
//      name: 'Admin',
//      email: 'admin@example.com',
//      password: 'admin'
//    })
//    .then(() => {
//      console.log('finished populating users');
//    });
//  });
var date = new Date("05.22.2016");
console.log(date);
var pid = null;
for (var i = 0; i < 100; i++) {
    date = new Date(+date + 1 * 24 * 60 * 60 * 1000);
    // console.log(date);
    /*Slot.create({
        pid: "57409f71874303b3ee62ce99",
        sid : "5740a29d874303b3ee62ce9a",
        date : date
    },
    {
        pid: "57409fdc3820c43b0f6c4618",
        sid : "5740a29d874303b3ee62ce9a",
        date : date
    },
    {
        pid: "574148f43820c43b0f6c4619",
        sid : "5740a29d874303b3ee62ce9a",
        date : date
    },
    {
        pid: "574149463820c43b0f6c461a",
        sid : "5740a29d874303b3ee62ce9a",
        date : date
    },
    {
        pid: "574149503820c43b0f6c461b",
        sid : "5740a29d874303b3ee62ce9a",
        date : date
    },
    {
        pid: "574149503820c43b0f6c461c",
        sid : "5740a29d874303b3ee62ce9a",
        date : date
    },
    {
        pid: "574149503820c43b0f6c461d",
        sid : "5740a29d874303b3ee62ce9a",
        date : date
    },
    {
        pid: "574149503820c43b0f6c461e",
        sid : "5740a29d874303b3ee62ce9a",
        date : date
    },
    {
        pid: "574149503820c43b0f6c461f",
        sid : "5740a29d874303b3ee62ce9a",
        date : date
    },
    {
        pid: "57414b963820c43b0f6c4620",
        sid : "5740a29d874303b3ee62ce9a",
        date : date
    });*/
}
//# sourceMappingURL=seed.js.map
