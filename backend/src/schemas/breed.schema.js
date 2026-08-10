const { z } = require('zod');

const petSpecies = [
  'DOG',
  'CAT',
  'BIRD',
  'RABBIT',
  'RODENT',
  'REPTILE',
  'OTHER',
];

const createBreedSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name is too long'),

  species: z.enum(petSpecies),
});

const updateBreedSchema = createBreedSchema.partial();

module.exports = {
  createBreedSchema,
  updateBreedSchema,
};