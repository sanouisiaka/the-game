-- AlterTable User
ALTER TABLE "User"
    DROP COLUMN "firstname";

ALTER TABLE "User"
    RENAME COLUMN "lastname" TO "name";
