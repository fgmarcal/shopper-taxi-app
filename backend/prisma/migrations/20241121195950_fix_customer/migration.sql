/*
  Warnings:

  - The primary key for the `Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Customer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "DriverReview" DROP CONSTRAINT "DriverReview_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Ride" DROP CONSTRAINT "Ride_customerId_fkey";

-- DropIndex
DROP INDEX "Customer_id_key";

-- AlterTable
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Customer_pkey" PRIMARY KEY ("email");

-- AddForeignKey
ALTER TABLE "DriverReview" ADD CONSTRAINT "DriverReview_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("email") ON DELETE CASCADE ON UPDATE CASCADE;
