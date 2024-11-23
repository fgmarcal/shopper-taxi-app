/*
  Warnings:

  - The primary key for the `Ride` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Ride` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `comment` on table `DriverReview` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Ride_id_key";

-- AlterTable
ALTER TABLE "DriverReview" ALTER COLUMN "comment" SET NOT NULL;

-- AlterTable
ALTER TABLE "Ride" DROP CONSTRAINT "Ride_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Ride_pkey" PRIMARY KEY ("id");
