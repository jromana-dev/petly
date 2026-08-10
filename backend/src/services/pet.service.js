const prisma = require('../config/prisma');

const {
  dateOnlyToDate,
} = require('../utils/date');

const getAllPets = async () => {
  return prisma.pet.findMany({
    where: {
      active: true,
    },
    include: {
      breeds: {
        include: {
          breed: true,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });
};

const getPetById = async (id) => {
  return prisma.pet.findUnique({
    where: {
      id,
    },
    include: {
      breeds: {
        include: {
          breed: true,
        },
      },
    },
  });
};

const createPet = async (data) => {
  return prisma.pet.create({
    data: {
      name: data.name,
      photo: data.photo || null,
      species: data.species,
      sex: data.sex || 'UNKNOWN',

      birthDate: dateOnlyToDate(data.birthDate),
      adoptionDate: dateOnlyToDate(data.adoptionDate),

      color: data.color || null,
      microchip: data.microchip || null,
      identifier: data.identifier || null,
      notes: data.notes || null,
    },

    include: {
      breeds: {
        include: {
          breed: true,
        },
      },
    },
  });
};

module.exports = {
  getAllPets,
  getPetById,
  createPet,
};