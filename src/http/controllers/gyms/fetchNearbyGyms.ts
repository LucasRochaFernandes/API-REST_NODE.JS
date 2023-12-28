import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFetchNearbyGymsUseCase } from '@/services/factories/makeFetchNearbyGymsUseCase'

export async function fetchNearbyGyms(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchNearbyGymsQuerySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = fetchNearbyGymsQuerySchema.parse(
    request.query,
  )

  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()
  const { gyms } = await fetchNearbyGymsUseCase.execute({
    userlatitude: latitude,
    userlongitude: longitude,
  })

  return reply.status(200).send({ gyms })
}
