import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAuthenticateUser } from '@/utils/test/createAuthenticateUser'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('History Check-ins (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to list the history of check-ins', async () => {
    const { token } = await createAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'Java',
        description: 'Great Gym',
        phone: '9900',
        latitude: 0,
        longitude: 0,
      },
    })

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: user.id,
        },
        {
          gym_id: gym.id,
          user_id: user.id,
        },
      ],
    })

    const response = await request(app.server)
      .get(`/check-ins/history`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkIns).toHaveLength(2)
  })
})
