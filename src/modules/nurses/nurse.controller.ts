import { createTResult } from "@src/core/mappers/tresult.mapper";
import { Request, Response } from "express";
import { addUser } from "../users/user.service";
import { create, get, getById, remove, update } from "./nurse.service";

export const createNurse = async (req: Request, res: Response) => {
    try {
        const user = await addUser({
            email: req.body.email,
            password: req.body.password,
            role: "NURSE",
        });

        if (!user) {
            return res.status(400).json(createTResult("", "User not created"));
        }

        const nurse = await create({
            userId: user.id,
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            license: req.body.license,
            officePhone: req.body.officePhone,
        });

        if (!nurse) {
            return res.status(400).json(createTResult("", "Nurse not created"));
        }

        return res.status(201).json(createTResult(nurse));
    } catch (error: any) {
        return res.status(500).json(createTResult("", error.message));
    }
};

export const updateNurse = async (req: Request, res: Response) => {
    try {
        const nurse = await update(Number(req.params.id), req.body);
        return res.status(200).json(createTResult(nurse));
    } catch (error: any) {
        return res.status(500).json(createTResult("", error.message));
    }
};

export const getAllNurses = async (req: Request, res: Response) => {
    try {
        const nurses = await get();
        return res.status(200).json(createTResult(nurses));
    } catch (error: any) {
        return res.status(500).json(createTResult("", error.message));
    }
};

export const getNurseByUserId = async (req: Request, res: Response) => {
    try {
        const nurse = await getById(Number(req.params.id));
        return res.status(200).json(createTResult(nurse));
    } catch (error: any) {
        return res.status(500).json(createTResult("", error.message));
    }
};

export const removeNurse = async (req: Request, res: Response) => {
    try {
        const nurse = await remove(Number(req.params.id));
        return res.status(200).json(createTResult(nurse));
    } catch (error: any) {
        return res.status(500).json(createTResult("", error.message));
    }
};
