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


module.exports = {
  getPets,
  getPet,
  createPet,
};