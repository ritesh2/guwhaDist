'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.download = download;
exports.paytmRequest = paytmRequest;
exports.recordCurrentBills = recordCurrentBills;

var _UserServices = require('../../models/UserServices.model');

var _UserServices2 = _interopRequireDefault(_UserServices);

var _UserTransactions = require('../../models/UserTransactions.model');

var _UserTransactions2 = _interopRequireDefault(_UserTransactions);

var _ElectricityProviders = require('../../models/ElectricityProviders.model');

var _ElectricityProviders2 = _interopRequireDefault(_ElectricityProviders);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import request from 'request';

var _exports = module.exports = {};
// import yql from 'yql';


_exports.billDeskUtility = function () {}
//    new yql.exec("select * from html where url='https://www.billdesk.com/pgidsk/pgmerc/apcpdcl_confirm.jsp?uscno=101372969' and xpath='/html/body/form/table/tbody/tr[2]/td/table/tbody/tr[8]/td/table/tbody/tr[6]/td[2]'", function(response) {
//        for(var inp in response.query.results.td.input) {
//            console.log(response.query.results.td.input[inp]);
//        }
//        //console.log(response.query.results.td.input);
//        //console.log(response.query.results.td.input[1]);
//        //console.log(response.query.results.input.value);
//    });

// Utility function that downloads a URL and invokes
// callback with the data.
;function download(url, callback) {
    _https2.default.get(url, function (res) {
        var data = "";
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on("end", function () {
            callback(data);
        });
    }).on("error", function () {
        callback(null);
    });
}

function paytmRequest() {
    // var request = require("request");

    //    var options = { method: 'POST',
    //      url: 'https://paytm.com/papi/v1/expresscart/verify',
    //      headers:
    //       {
    //         'content-type': 'application/json' },
    //      body:
    //       { cart_items:
    //          [ { product_id: 33683541,
    //              qty: 1,
    //              configuration: { recharge_number: '6064018000', price: 10 },
    //              meta_data: {} } ] },
    //      json: true };
    //
    //    request(options, function (error, response, body) {
    //      if (error) throw new Error(error);
    //
    //      console.log(body);
    //    });

}

function recordCurrentBills() {
    var start = (0, _moment2.default)().startOf('month').toDate();
    var end = (0, _moment2.default)().endOf('day').toDate();
    _UserServices2.default.find().exec(function (err, userService) {
        if (userService.length) {
            _UserTransactions2.default.find({ userId: userService[0].userId, billDate: { $gte: start, $lt: end } }).exec(function (err, userTransaction) {
                if (err) {
                    console.log(err);
                }
                if (!userTransaction.length) {
                    var instance = new _UserTransactions2.default({
                        userId: userService[0].userId,
                        serviceId: userService[0].eProviderId,
                        billAmount: '123.00',
                        billDate: (0, _moment2.default)().toDate()
                    });
                    instance.save();
                } else {
                    console.log('User Bill already registered in transaction');
                    //console.log(userTransaction);
                }
            });
        }
    });
}
//# sourceMappingURL=electricityservice.controller.js.map
