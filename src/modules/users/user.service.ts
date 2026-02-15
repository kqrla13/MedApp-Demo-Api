import { prismaClient } from "@src/core/config/database";
import { hashPassword } from "@src/core/utils/security";

export const getUsers = async () => {
  return prismaClient.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getUserByEmail = async (email: string) => {
  return prismaClient.user.findFirst({
    where: {
      email,
    },
    include: {
      doctor: true,
      nurse: true,
    },
  });
};

export const addUser = async (data: any) => {
  const hashedPassword = await hashPassword(data.password);
  return prismaClient.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
};

export const updateUser = async (id: number, data: any) => {
  return prismaClient.user.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteUser = async (id: number) => {
  return prismaClient.user.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
};
