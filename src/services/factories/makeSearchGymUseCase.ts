import { PrismaGymsRepository } from '@/repositories/prisma/prismaGymsRepository'
import { SearchGymUseCase } from '../searchGym'

export function makeSearchGymUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const searchGymUseCase = new SearchGymUseCase(prismaGymsRepository)
  return searchGymUseCase
}
