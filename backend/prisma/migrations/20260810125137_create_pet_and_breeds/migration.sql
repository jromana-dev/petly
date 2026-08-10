-- CreateTable
CREATE TABLE `pet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `photo` VARCHAR(191) NULL,
    `species` ENUM('DOG', 'CAT', 'BIRD', 'RABBIT', 'RODENT', 'REPTILE', 'OTHER') NOT NULL,
    `sex` ENUM('MALE', 'FEMALE', 'UNKNOWN') NOT NULL DEFAULT 'UNKNOWN',
    `birthDate` DATETIME(3) NULL,
    `adoptionDate` DATETIME(3) NULL,
    `color` VARCHAR(191) NULL,
    `microchip` VARCHAR(191) NULL,
    `identifier` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `pet_microchip_key`(`microchip`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `breed` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `species` ENUM('DOG', 'CAT', 'BIRD', 'RABBIT', 'RODENT', 'REPTILE', 'OTHER') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `breed_name_species_key`(`name`, `species`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pet_breed` (
    `petId` INTEGER NOT NULL,
    `breedId` INTEGER NOT NULL,
    `percentage` INTEGER NULL,

    PRIMARY KEY (`petId`, `breedId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pet_breed` ADD CONSTRAINT `pet_breed_petId_fkey` FOREIGN KEY (`petId`) REFERENCES `pet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pet_breed` ADD CONSTRAINT `pet_breed_breedId_fkey` FOREIGN KEY (`breedId`) REFERENCES `breed`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
