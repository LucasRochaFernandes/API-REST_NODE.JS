import { PrismaGymsRepository } from '@/repositories/prisma/prismaGymsRepository'
import { SearchNearbyGymsUseCase } from '../fetchNearbyGyms'

export function makeFetchNearbyGymsUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const fetchNearbyGymsUseCase = new SearchNearbyGymsUseCase(
    prismaGymsRepository,
  )
  return fetchNearbyGymsUseCase
}
