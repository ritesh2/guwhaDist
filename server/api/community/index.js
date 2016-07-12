'use strict';

var express = require('express');
var controller = require('./community.controller');

var router = express.Router();

router.get('/mail', controller.mail);
router.get('/blocks/:id', controller.getBlocks);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/floors', controller.deleteFloors);
router.delete('/blocks', controller.deleteBlock);
router.delete('/:id', controller.destroy);

// CRUD for blocks
router.post('/blocks', controller.addBlock);

//CRUD for floors

router.post('/floors', controller.addFloors);

module.exports = router;
//# sourceMappingURL=index.js.map
