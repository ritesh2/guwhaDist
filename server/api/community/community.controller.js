/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/community              ->  index
 * POST    /api/community              ->  create
 * GET     /api/community/:id          ->  show
 * PUT     /api/community/:id          ->  update
 * DELETE  /api/community/:id          ->  destroy
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
exports.addBlock = addBlock;
exports.deleteBlock = deleteBlock;
exports.getBlocks = getBlocks;
exports.addFloors = addFloors;
exports.deleteFloors = deleteFloors;
exports.mail = mail;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _passwordGenerator = require('password-generator');

var _passwordGenerator2 = _interopRequireDefault(_passwordGenerator);

var _community = require('./community.model');

var _community2 = _interopRequireDefault(_community);

var _user = require('../user/user.model');

var _user2 = _interopRequireDefault(_user);

var _sendgrid = require('sendgrid');

var _sendgrid2 = _interopRequireDefault(_sendgrid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var helper = _sendgrid2.default.mail;
var generatePassword = require('password-generator');

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

// Gets a list of Communitys
function index(req, res) {
  return _community2.default.find().exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Community from the DB
function show(req, res) {
  return _community2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Community in the DB
function create(req, res) {
  if (!_validator2.default.isEmail(req.body.emailId)) {
    res.status(400).send("Email is bad");
    return;
  }
  if (!_validator2.default.isNumeric(req.body.phoneNumber)) {
    res.status(400).send("Phone number is bad");
    return;
  }
  var docs = [];
  return _community2.default.create(req.body).then(function (community) {
    var result = [];
    var password = generatePassword(8, false);
    docs.push(community);
    return _user2.default.create({ email: req.body.emailId,
      firstName: req.body.communityName,
      communityId: community.communityId,
      password: password }).then(respondCommunityWithResult(res, password, 201)).catch(handleTransactionError(res, docs));
  }).catch(handleTransactionError(res, docs));
}

function handleTransactionError(res, docs, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    for (var i = 0; i < docs.length; i++) {
      docs[i].remove(onRemove);
    }
    res.status(statusCode).send(err);
  };
}

function onRemove(err, doc) {
  console.log('removed:', doc);
}

function createUserWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
      mail(entity.emailId);
    }
  };
}

function respondCommunityWithResult(res, password, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
      mail(entity.email, password);
    }
  };
}

// Updates an existing Community in the DB
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _community2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Community from the DB
function destroy(req, res) {
  return _community2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}

function addBlock(req, res) {
  return _community2.default.findOneAndUpdate({ communityId: req.body.communityId }, { $push: { blocks: req.body.blocks } }, { safe: true, upsert: true, new: true }).then(respondWithResult(res, 201)).catch(handleError(res));
}

function deleteBlock(req, res) {
  _community2.default.update({ "communityId": req.body.id }, { $pull: { "blocks": { "blockName": { $in: req.body.blockNames } } } }, { safe: true }).then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

function getBlocks(req, res) {
  console.log("Community Id is " + req.params.id);
  return _community2.default.find({ communityId: req.params.id }, { blocks: 1 }).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

function addFloors(req, res) {
  _community2.default.update({ "communityId": req.body.id, "blocks.blockName": req.body.blockName }, { $addToSet: { "blocks.$.floors": { $each: req.body.floors }
    } }).then(respondWithResult(res, 200)).catch(handleError(res));
}

function deleteFloors(req, res) {
  _community2.default.update({ "communityId": req.body.id, "blocks.blockName": req.body.blockName }, { $pull: { "blocks.$.floors": { "floorNumber": { $in: req.body.floors } } } }, { safe: true }).then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

function mail(emailId, password) {

  var helper = require('sendgrid').mail;
  var from_email = new helper.Email("noreply@guwha.com");
  var to_email = new helper.Email(emailId);
  var subject = "Welcome to Guwha Community";
  var bodyContent = "Hi, \n Welcome to Guwha \n Your username : " + emailId + " \n Password : " + password + "\nRegards,\nGuwha";
  var content = new helper.Content("text/plain", bodyContent);
  var mail = new helper.Mail(from_email, subject, to_email, content);

  var sg = require('sendgrid').SendGrid('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');
  var requestBody = mail.toJSON();
  var request = sg.emptyRequest();
  request.method = 'POST';
  request.path = '/v3/mail/send';
  request.body = requestBody;
  sg.API(request, function (response) {
    //    console.log(response.statusCode)
    //    console.log(response.body)
    //    console.log(response.headers)
  });
}
//# sourceMappingURL=community.controller.js.map
