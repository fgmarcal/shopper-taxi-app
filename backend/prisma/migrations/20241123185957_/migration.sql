/*
  Warnings:

  - You are about to alter the column `value` on the `Driver` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `min_km` on the `Driver` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to drop the column `destinationId` on the `Ride` table. All the data in the column will be lost.
  - You are about to drop the column `originId` on the `Ride` table. All the data in the column will be lost.
  - You are about to alter the column `distance` on the `Ride` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `value` on the `Ride` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Driver" ALTER COLUMN "value" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "min_km" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Ride" DROP COLUMN "destinationId",
DROP COLUMN "originId",
ALTER COLUMN "distance" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "value" SET DATA TYPE DOUBLE PRECISION;
