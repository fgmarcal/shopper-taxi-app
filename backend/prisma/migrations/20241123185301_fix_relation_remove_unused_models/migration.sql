/*
  Warnings:

  - You are about to drop the `Destination` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Origin` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `destination` to the `Ride` table without a default value. This is not possible if the table is not empty.
  - Added the required column `origin` to the `Ride` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ride" DROP CONSTRAINT "Ride_destinationId_fkey";

-- DropForeignKey
ALTER TABLE "Ride" DROP CONSTRAINT "Ride_originId_fkey";

-- AlterTable
ALTER TABLE "Ride" ADD COLUMN     "destination" TEXT NOT NULL,
ADD COLUMN     "origin" TEXT NOT NULL;

-- DropTable
DROP TABLE "Destination";

-- DropTable
DROP TABLE "Origin";
