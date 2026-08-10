const prisma = require('../config/prisma');
const AppError = require('../utils/appError');

const {
  dateOnlyToDate,
} = require('../utils/date');

const validateBreeds = async (breedIds, species) => {
  if (!breedIds || breedIds.length === 0) {
    return;
  }

  const breeds = await prisma.breed.findMany({
    where: {
      id: {
        in: breedIds,
      },
    },
  });

  if (breeds.length !== breedIds.length) {
    throw new AppError(
      'One or more breeds were not found',
      400
    );
  }

  const invalidBreed = breeds.find(
    (breed) => breed.species !== species
  );

  if (invalidBreed) {
    throw new AppError(
      `Breed ${invalidBreed.id} does not belong to species ${species}`,
      400
    );
  }
};

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
  await validateBreeds(data.breedIds, data.species);

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

      breeds: {
        create: (data.breedIds || []).map((breedId) => ({
          breed: {
            connect: {
              id: breedId,
            },
          },
        })),
      },
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
  const currentPet = await prisma.pet.findUnique({
    where: {
      id,
    },
  });

  if (!currentPet) {
    return null;
  }

  const newSpecies = data.species || currentPet.species;

  if (data.breedIds !== undefined) {
    await validateBreeds(data.breedIds, newSpecies);
  } else if (
    data.species !== undefined &&
    data.species !== currentPet.species
  ) {
    throw new Error(
      'breedIds must be provided when changing species'
    );
  }

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

      ...(data.breedIds !== undefined && {
        breeds: {
          deleteMany: {},
          create: data.breedIds.map((breedId) => ({
            breed: {
              connect: {
                id: breedId,
              },
            },
          })),
        },
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