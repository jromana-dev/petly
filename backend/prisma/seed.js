require('dotenv/config');

const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');

const breeds = require('../data/breeds.json');

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log(`Seeding ${breeds.length} breeds...`);

  for (const breed of breeds) {
    await prisma.breed.upsert({
      where: {
        name_species: {
          name: breed.name,
          species: breed.species,
        },
      },
      update: {
        name: breed.name,
        species: breed.species,
      },
      create: {
        name: breed.name,
        species: breed.species,
      },
    });
  }

  console.log('Breed seed completed successfully.');
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });