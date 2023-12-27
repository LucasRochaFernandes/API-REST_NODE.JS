import { PrismaGymsRepository } from '@/repositories/prisma/prismaGymsRepository'
import { CreateGymUseCase } from '../createGym'

export function makeCreateGymUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const createGymUseCase = new CreateGymUseCase(prismaGymsRepository)
  return createGymUseCase
}
