const express = require('express');

const petController = require('../controllers/pet.controller');
const validate = require('../middleware/validate');
const { createPetSchema } = require('../schemas/pet.schema');

const router = express.Router();

router.get('/', petController.getPets);
router.get('/:id', petController.getPet);
router.post('/',validate(createPetSchema),petController.createPet);
router.put('/:id', validate(updatePetSchema), petController.updatePet);
router.delete('/:id', petController.deletePet);

module.exports = router;