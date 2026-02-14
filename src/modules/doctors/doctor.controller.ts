import { createTResult } from "@src/core/mappers/tresult.mapper";
import { Request, Response } from "express";
import { addUser } from "../users/user.service";
import { create, getById, get, update, remove } from "./doctor.service";

export const createDoctor = async (req: Request, res: Response) => {
    try {

        const user = await addUser({
            email: req.body.email,
            password: req.body.password,
            role: "DOCTOR",
        });

        if (!user) {
            return res.status(400).json(createTResult("", "User not created"));
        }

        const doctor = await create({
            userId: user.id,
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            licenseNumber: req.body.licenseNumber,
            specialty: req.body.specialty,
            subSpecialty: req.body.subSpecialty,
            phone: req.body.phone,
            officePhone: req.body.officePhone,
        });

        if (!doctor) {
            return res.status(400).json(createTResult("", "Doctor not created"));
        }

        return res.status(201).json(createTResult(doctor));
    } catch (error: any) {
        return res.status(500).json(createTResult("", error.message));
    }
};

export const updateDoctor = async (req: Request, res: Response) => {
    try {
        const doctor = await update(Number(req.params.id), req.body);
        return res.status(200).json(createTResult(doctor));
    } catch (error: any) {
        return res.status(500).json(createTResult("", error.message));
    }
};

export const getAllDoctors = async (req: Request, res: Response) => {
    try {
        const doctors = await get();
        return res.status(200).json(createTResult(doctors));
    } catch (error: any) {
        return res.status(500).json(createTResult("", error.message));
    }
};

export const getDoctorByUserId = async (req: Request, res: Response) => {
    try {
        const doctor = await getById(Number(req.params.id));
        return res.status(200).json(createTResult(doctor));
    } catch (error: any) {
        return res.status(500).json(createTResult("", error.message));
    }
};


