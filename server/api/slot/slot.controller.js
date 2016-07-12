/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/slots              ->  index
 * POST    /api/slots              ->  create
 * GET     /api/slots/:id          ->  show
 * PUT     /api/slots/:id          ->  update
 * DELETE  /api/slots/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.show = show;
exports.findSlot = findSlot;
exports.create = create;
exports.update = update;
exports.destroy = destroy;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _slot = require('./slot.model');

var _slot2 = _interopRequireDefault(_slot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function respondSlotsWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      // var finalResult = _.map({slot10 : true, slot11 : false, slot12 : false, slot1 : false, slot2 : false, slot3 : false, slot4 : false, slot5 : false, slot6 : false, slot7 : false });
      var resultJson = { slot10: false, slot11: false, slot12: false, slot1: false, slot2: false, slot3: false, slot4: false, slot5: false, slot6: false, slot7: false };
      for (var i = 0; i < entity.length; i++) {
        if (!resultJson.slot10 && entity[i].slot10) {
          resultJson.slot10 = true;
        }
        if (!resultJson.slot11 && entity[i].slot11) {
          resultJson.slot11 = true;
        }
        if (!resultJson.slot12 && entity[i].slot12) {
          resultJson.slot12 = true;
        }
        if (!resultJson.slot1 && entity[i].slot1) {
          resultJson.slot1 = true;
        }
        if (!resultJson.slot2 && entity[i].slot2) {
          resultJson.slot2 = true;
        }
        if (!resultJson.slot3 && entity[i].slot3) {
          resultJson.slot3 = true;
        }
        if (!resultJson.slot4 && entity[i].slot4) {
          resultJson.slot4 = true;
        }
        if (!resultJson.slot5 && entity[i].slot5) {
          resultJson.slot5 = true;
        }
        if (!resultJson.slot6 && entity[i].slot6) {
          resultJson.slot6 = true;
        }
        if (!resultJson.slot7 && entity[i].slot7) {
          resultJson.slot7 = true;
        }
        if (!resultJson.date && entity[i].date) {
          resultJson.date = entity[i].date;
        }
      }
      res.status(statusCode).json(resultJson);
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

// Gets a list of Slots
function index(req, res) {
  return _slot2.default.find().exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Slot from the DB
function show(req, res) {
  return _slot2.default.find({ sid: req.params.sid, date: req.params.date }).exec().then(handleEntityNotFound(res)).then(respondSlotsWithResult(res)).catch(handleError(res));
}

function findSlot(req, res) {
  var query = {};
  query["sid"] = req.params.sid;
  query["date"] = req.params.date;
  query[req.params.slot] = true;
  return _slot2.default.find(query).select('pid -_id').exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Slot in the DB
function create(req, res) {
  return _slot2.default.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Updates an existing Slot in the DB
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _slot2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Slot from the DB
function destroy(req, res) {
  return _slot2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=slot.controller.js.map
