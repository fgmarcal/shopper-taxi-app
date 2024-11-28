-- CreateTable
CREATE TABLE "Customer" (
    "email" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "vehicle" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "min_km" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "DriverReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "comment" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "driverId" INTEGER NOT NULL,
    CONSTRAINT "DriverReview_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("email") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "DriverReview_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Ride" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "distance" REAL NOT NULL,
    "duration" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "driverId" INTEGER NOT NULL,
    "value" REAL NOT NULL,
    CONSTRAINT "Ride_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("email") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Ride_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DriverReview_id_key" ON "DriverReview"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DriverReview_customerId_driverId_key" ON "DriverReview"("customerId", "driverId");
