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

const updatePet = async (id, data) => {
  return prisma.pet.update({
    where: {
      id,
    },
    data: {
      ...(data.name !== undefined && {
        name: data.name,
      }),

      ...(data.photo !== undefined && {
        photo: data.photo,
      }),

      ...(data.species !== undefined && {
        species: data.species,
      }),

      ...(data.sex !== undefined && {
        sex: data.sex,
      }),

      ...(data.birthDate !== undefined && {
        birthDate: dateOnlyToDate(data.birthDate),
      }),

      ...(data.adoptionDate !== undefined && {
        adoptionDate: dateOnlyToDate(data.adoptionDate),
      }),

      ...(data.color !== undefined && {
        color: data.color,
      }),

      ...(data.microchip !== undefined && {
        microchip: data.microchip,
      }),

      ...(data.identifier !== undefined && {
        identifier: data.identifier,
      }),

      ...(data.notes !== undefined && {
        notes: data.notes,
      }),
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

const deletePet = async (id) => {
  return prisma.pet.update({
    where: {
      id,
    },
    data: {
      active: false,
    },
  });
};

module.exports = {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
};