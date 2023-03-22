const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.user.createMany({
      data: [
        {
          email: 'admin@admin.com',
          name: 'AdminUser',
          password: '$2a$10$larPpJnlYc.PrTfAIYcHy.DvwGnkVH4MnlJE1GRex84t0GBgSETiy',
          admin: true,
        },
        {
          email: 'user001@user.com',
          name: 'user001',
          password: '$2a$10$7P5Ph.olO0JS9R9dWYnl1eTFwzVaB1beDdlAbAZWloZgAWDt2rvuq',
          admin: false,
        },
        {
          email: 'user002@user.com',
          name: 'user002',
          password: '$2a$10$7P5Ph.olO0JS9R9dWYnl1eTFwzVaB1beDdlAbAZWloZgAWDt2rvuq',
          admin: false,
        }
      ]
    })
    console.log('Added user data')

  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

load();