import { prisma } from '@/lib/prisma'
import { PrismaUsersRepository } from '@/repositories/prismaUsersRepository'
import { hash } from 'bcryptjs'

interface IRegisterUseCaseParams {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password,
}: IRegisterUseCaseParams) {
  const passwordHash = await hash(password, 6)
  const prismaUsersRepository = new PrismaUsersRepository()

  const userWithSameEmail = await prismaUsersRepository.findByEmail(email)

  if (userWithSameEmail) {
    throw new Error('Email already exists')
  }

  await prismaUsersRepository.create({
    name,
    email,
    password_hash: passwordHash,
  })
}
