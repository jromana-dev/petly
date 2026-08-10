const express = require('express');

const breedController = require('../controllers/breed.controller');
const validate = require('../middleware/validate');

const {
  createBreedSchema,
  updateBreedSchema,
} = require('../schemas/breed.schema');

const router = express.Router();

router.get('/', breedController.getBreeds);

router.get('/:id', breedController.getBreed);

router.post(
  '/',
  validate(createBreedSchema),
  breedController.createBreed
);

router.put(
  '/:id',
  validate(updateBreedSchema),
  breedController.updateBreed
);

router.delete(
  '/:id',
  breedController.deleteBreed
);

module.exports = router;