-- CreateEnum
CREATE TYPE "Event_status" AS ENUM ('OPEN', 'ONGOING', 'CLOSE');

-- CreateEnum
CREATE TYPE "Winner_option" AS ENUM ('HOME', 'DRAW', 'AWAY');

-- CreateEnum
CREATE TYPE "Bet_status" AS ENUM ('WIN', 'LOOSE', 'CANCEL');

-- CreateTable
CREATE TABLE "League" (
    "id" SERIAL NOT NULL,
    "api_foot_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "logo" TEXT NOT NULL,

    CONSTRAINT "League_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "api_foot_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "status" "Event_status" NOT NULL DEFAULT 'OPEN',
    "league_id" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fixture" (
    "eventId" TEXT NOT NULL,
    "api_foot_id" INTEGER NOT NULL,
    "home_team_id" INTEGER NOT NULL,
    "away_team_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "home_team_goal" INTEGER NOT NULL,
    "away_team_goal" INTEGER NOT NULL,

    CONSTRAINT "Fixture_pkey" PRIMARY KEY ("eventId")
);

-- CreateTable
CREATE TABLE "Bet" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "odd" DOUBLE PRECISION NOT NULL,
    "status" "Bet_status",

    CONSTRAINT "Bet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Winner_bet" (
    "betId" TEXT NOT NULL,
    "winner" "Winner_option" NOT NULL,

    CONSTRAINT "Winner_bet_pkey" PRIMARY KEY ("betId")
);

-- CreateIndex
CREATE UNIQUE INDEX "League_api_foot_id_key" ON "League"("api_foot_id");

-- CreateIndex
CREATE UNIQUE INDEX "Team_api_foot_id_key" ON "Team"("api_foot_id");

-- CreateIndex
CREATE UNIQUE INDEX "Fixture_api_foot_id_key" ON "Fixture"("api_foot_id");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_league_id_fkey" FOREIGN KEY ("league_id") REFERENCES "League"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fixture" ADD CONSTRAINT "Fixture_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fixture" ADD CONSTRAINT "Fixture_home_team_id_fkey" FOREIGN KEY ("home_team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fixture" ADD CONSTRAINT "Fixture_away_team_id_fkey" FOREIGN KEY ("away_team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Winner_bet" ADD CONSTRAINT "Winner_bet_betId_fkey" FOREIGN KEY ("betId") REFERENCES "Bet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
