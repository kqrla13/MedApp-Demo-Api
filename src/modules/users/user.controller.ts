import { Request, Response } from "express";
import { createTResult } from "@src/core/mappers/tresult.mapper";
import { getUserByEmail, getUsers, addUser } from "./user.service";
import { comparePassword, generateJWT } from "@src/core/utils/security";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json(createTResult("", "User not found"));
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json(createTResult("", "Invalid password"));
    }

    const payload: any = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    if (user.role === 'DOCTOR' && user.doctor) {
      payload.doctorId = user.doctor.id;
    } else if (user.role === 'NURSE' && user.nurse) {
      payload.nurseId = user.nurse.id;
    }

    return res.status(200).json(createTResult(await generateJWT(payload)));
  } catch (error: any) {
    return res.status(500).json(createTResult("", error.message));
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();

    return res.status(200).json(createTResult(users));
  } catch (error: any) {
    return res.status(500).json(createTResult("", error.message));
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json(createTResult("", "User already exists"));
    }

    const user = await addUser({
      email,
      password,
      role: role || "ADMIN",
    });

    return res.status(201).json(createTResult(user));
  } catch (error: any) {
    return res.status(500).json(createTResult("", error.message));
  }
};
