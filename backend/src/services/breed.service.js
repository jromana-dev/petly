const prisma = require('../config/prisma');

const getAllBreeds = async (species) => {
  return prisma.breed.findMany({
    where: {
      active: true,
      ...(species && {
        species,
      }),
    },
    orderBy: {
      name: 'asc',
    },
  });
};

const getBreedById = async (id) => {
  return prisma.breed.findUnique({
    where: {
      id,
    },
  });
};

const createBreed = async (data) => {
  return prisma.breed.create({
    data: {
      name: data.name,
      species: data.species,
    },
  });
};

const updateBreed = async (id, data) => {
  return prisma.breed.update({
    where: {
      id,
    },
    data,
  });
};

const deleteBreed = async (id) => {
  return prisma.breed.update({
    where: {
      id,
    },
    data: {
      active: false,
    },
  });
};

module.exports = {
  getAllBreeds,
  getBreedById,
  createBreed,
  updateBreed,
  deleteBreed,
};