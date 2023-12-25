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

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('Email already exists')
  }

  const prismaUsersRepository = new PrismaUsersRepository()

  await prismaUsersRepository.create({
    name,
    email,
    password_hash: passwordHash,
  })
}