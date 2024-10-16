-- CreateTable
CREATE TABLE "Godown" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parent_godown_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Godown_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "item_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "godown_id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "attributes" JSONB NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("item_id")
);

-- AddForeignKey
ALTER TABLE "Godown" ADD CONSTRAINT "Godown_parent_godown_id_fkey" FOREIGN KEY ("parent_godown_id") REFERENCES "Godown"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_godown_id_fkey" FOREIGN KEY ("godown_id") REFERENCES "Godown"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
