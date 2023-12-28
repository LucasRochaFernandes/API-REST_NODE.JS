import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeSearchGymUseCase } from '@/services/factories/makeSearchGymUseCase'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q: query, page } = searchGymsQuerySchema.parse(request.query)

  const searchGymUseCase = makeSearchGymUseCase()
  const { gyms } = await searchGymUseCase.execute({
    query,
    page,
  })

  return reply.status(200).send({ gyms })
}
