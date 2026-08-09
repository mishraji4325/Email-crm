-- CreateTable
CREATE TABLE "public"."SequenceLead" (
    "id" TEXT NOT NULL,
    "sequenceId" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,

    CONSTRAINT "SequenceLead_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."SequenceLead" ADD CONSTRAINT "SequenceLead_sequenceId_fkey" FOREIGN KEY ("sequenceId") REFERENCES "public"."Sequence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SequenceLead" ADD CONSTRAINT "SequenceLead_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "public"."Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
