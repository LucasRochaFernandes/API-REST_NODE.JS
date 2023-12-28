import { FastifyInstance } from 'fastify'
import { verifyJwt } from '../../middlewares/verifyJwt'
import { create } from './checkIn'
import { validate } from './validateCheckIn'
import { history } from './fetchUserCheckInsHistory'
import { metrics } from './getUserMetrics'

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)
  app.post('/gyms/:gymId/check-ins', create)
  app.patch('/check-ins/:checkInId/validate', validate)
}
