const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.user.createMany({
      data: [
        {
          email: 'admin@admin.com',
          name: 'AdminUser',
          password: 'AdminPass',
          admin: true,
        },
        {
          email: 'user001@user.com',
          name: 'user001',
          password: 'user',
          admin: false,
        },
        {
          email: 'user002@user.com',
          name: 'user002',
          password: 'user',
          admin: false,
        }
      ]
    })
    console.log('Added category data')

  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

load();