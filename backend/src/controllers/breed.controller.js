const breedService = require('../services/breed.service');

const getBreeds = async (req, res, next) => {
  try {
    const { species } = req.query;

    const breeds = await breedService.getAllBreeds(species);

    res.json(breeds);
  } catch (error) {
    next(error);
  }
};

const getBreed = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: 'Invalid breed id',
      });
    }

    const breed = await breedService.getBreedById(id);

    if (!breed) {
      return res.status(404).json({
        error: 'Breed not found',
      });
    }

    res.json(breed);
  } catch (error) {
    next(error);
  }
};

const createBreed = async (req, res, next) => {
  try {
    const breed = await breedService.createBreed(req.body);

    res.status(201).json(breed);
  } catch (error) {
    next(error);
  }
};

const updateBreed = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: 'Invalid breed id',
      });
    }

    const existingBreed = await breedService.getBreedById(id);

    if (!existingBreed) {
      return res.status(404).json({
        error: 'Breed not found',
      });
    }

    const breed = await breedService.updateBreed(id, req.body);

    res.json(breed);
  } catch (error) {
    next(error);
  }
};

const deleteBreed = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: 'Invalid breed id',
      });
    }

    const existingBreed = await breedService.getBreedById(id);

    if (!existingBreed) {
      return res.status(404).json({
        error: 'Breed not found',
      });
    }

    await breedService.deleteBreed(id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBreeds,
  getBreed,
  createBreed,
  updateBreed,
  deleteBreed,
};