import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Prisma connected');
  await prisma.$connect();
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
