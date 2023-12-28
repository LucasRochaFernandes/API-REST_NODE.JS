import { app } from '@/app'
import { createAuthenticateUser } from '@/utils/test/createAuthenticateUser'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a gym', async () => {
    const { token } = await createAuthenticateUser(app)

    const renponse = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Python Gym',
        description: 'Great Gym',
        phone: '9900',
        latitude: 0,
        longitude: 0,
      })

    expect(renponse.statusCode).toEqual(201)
  })
})
