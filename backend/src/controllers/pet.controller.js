const petService = require('../services/pet.service');

const getPets = async (req, res, next) => {
  try {
    const pets = await petService.getAllPets();

    res.json(pets);
  } catch (error) {
    next(error);
  }
};

const getPet = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: 'Invalid pet id',
      });
    }

    const pet = await petService.getPetById(id);

    if (!pet) {
      return res.status(404).json({
        error: 'Pet not found',
      });
    }

    res.json(pet);
  } catch (error) {
    next(error);
  }
};


const createPet = async (req, res, next) => {
  try {
    const pet = await petService.createPet(req.body);

    res.status(201).json(pet);
  } catch (error) {
    next(error);
  }
};

const updatePet = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: 'Invalid pet id',
      });
    }

    const existingPet = await petService.getPetById(id);

    if (!existingPet) {
      return res.status(404).json({
        error: 'Pet not found',
      });
    }

    const pet = await petService.updatePet(id, req.body);

    res.json(pet);
  } catch (error) {
    next(error);
  }
};

const deletePet = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: 'Invalid pet id',
      });
    }

    const existingPet = await petService.getPetById(id);

    if (!existingPet) {
      return res.status(404).json({
        error: 'Pet not found',
      });
    }

    await petService.deletePet(id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPets,
  getPet,
  createPet,
  updatePet,
  deletePet,
};