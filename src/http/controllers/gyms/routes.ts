import { FastifyInstance } from 'fastify'
import { verifyJwt } from '../../middlewares/verifyJwt'
import { search } from './searchGym'
import { fetchNearbyGyms } from './fetchNearbyGyms'
import { createGym } from './createGym'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
  app.get('/gyms/search', search)
  app.get('/gyms/nearby', fetchNearbyGyms)
  app.post('/gyms', createGym)
}
