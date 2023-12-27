import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/checkInsRepository'

interface FetchUserCheckInsUseCaseRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsUseCaseRequest): Promise<FetchUserCheckInsUseCaseResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(userId, page)
    return { checkIns }
  }
}
