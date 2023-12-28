import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAuthenticateUser } from '@/utils/test/createAuthenticateUser'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Check In (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a check-in', async () => {
    const { token } = await createAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'Java',
        description: 'Great Gym',
        phone: '9900',
        latitude: 0,
        longitude: 0,
      },
    })

    const renponse = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: 0,
        longitude: 0,
      })

    expect(renponse.statusCode).toEqual(201)
  })
})
