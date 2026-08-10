const { z } = require('zod');

const dateOnlySchema = z
  .string()
  .regex(
    /^\d{4}-\d{2}-\d{2}$/,
    'Date must use YYYY-MM-DD format'
  );

const createPetSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name is too long'),

  photo: z
    .string()
    .trim()
    .optional()
    .nullable(),

  species: z.enum([
    'DOG',
    'CAT',
    'BIRD',
    'RABBIT',
    'RODENT',
    'REPTILE',
    'OTHER',
  ]),

  sex: z
    .enum(['MALE', 'FEMALE', 'UNKNOWN'])
    .optional(),

  birthDate: dateOnlySchema
    .optional()
    .nullable(),

  adoptionDate: dateOnlySchema
    .optional()
    .nullable(),

  color: z
    .string()
    .trim()
    .max(100)
    .optional()
    .nullable(),

  microchip: z
    .string()
    .trim()
    .max(50)
    .optional()
    .nullable(),

  identifier: z
    .string()
    .trim()
    .max(100)
    .optional()
    .nullable(),

  notes: z
    .string()
    .trim()
    .max(2000)
    .optional()
    .nullable(),
});

module.exports = {
  createPetSchema,
};