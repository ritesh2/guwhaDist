/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/billservices              ->  index
 * POST    /api/billservices              ->  create
 * GET     /api/billservices/:id          ->  show
 * PUT     /api/billservices/:id          ->  update
 * DELETE  /api/billservices/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.show = show;
exports.create = create;
exports.update = update;
exports.destroy = destroy;
exports.createTransaction = createTransaction;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _billservice = require('./billservice.model');

var _billservice2 = _interopRequireDefault(_billservice);

var _UserServices = require('../../models/UserServices.model');

var _UserServices2 = _interopRequireDefault(_UserServices);

var _ElectricityProviders = require('../../models/ElectricityProviders.model');

var _ElectricityProviders2 = _interopRequireDefault(_ElectricityProviders);

var _electricityservice = require('./electricityservice.controller');

var _electricityservice2 = _interopRequireDefault(_electricityservice);

var _nodeSchedule = require('node-schedule');

var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function (entity) {
    var updated = _lodash2.default.merge(entity, updates);
    return updated.save().then(function (updated) {
      return updated;
    });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove().then(function () {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Billservices
function index(req, res) {
  return _ElectricityProviders2.default.find().exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Billservice from the DB
function show(req, res) {
  return _billservice2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Billservice in the DB
function create(req, res) {
  return _UserServices2.default.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Updates an existing Billservice in the DB
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _billservice2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Billservice from the DB
function destroy(req, res) {
  return _billservice2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}

function createTransaction(instance) {
  return instance.save().then(function (val) {
    console.log(val);
  });
}

//cron.scheduleJob('2 * * * * *', function(){
//    console.log('This runs at the 2th mintue of every hour.');
//    //paytmRequest();
//   // electricityService.billDeskUtility();
//    //electricityService.recordCurrentBills();
//});
//# sourceMappingURL=billservice.controller.js.map
