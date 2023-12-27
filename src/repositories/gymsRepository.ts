import { Prisma, Gym } from '@prisma/client'

export interface GymsRepository {
  create(data: Prisma.GymCreateManyInput): Promise<null>
  findById(id: string): Promise<Gym | null>
}
