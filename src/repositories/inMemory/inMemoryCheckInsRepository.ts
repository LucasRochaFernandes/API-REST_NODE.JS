import { Prisma, CheckIn } from '@prisma/client'
import { CheckInsRepository } from '../checkInsRepository'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      user_id: data.user_id,
      gym_id: data.gym_id,
    }
    this.items.push(checkIn)
    return checkIn
  }
}