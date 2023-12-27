import { Gym, Prisma } from '@prisma/client'
import { GymsRepository } from '../gymsRepository'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === id)
    if (!gym) {
      return null
    }
    return gym
  }

  async create(data: Prisma.GymUncheckedCreateInput) {
    return null
  }
}
