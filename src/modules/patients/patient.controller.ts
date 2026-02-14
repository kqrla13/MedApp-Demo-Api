import { Request, Response } from "express";
import { create, get, getById, remove, update } from "./patient.service";
import { createTResult } from "@src/core/mappers/tresult.mapper";

export const createPatient = async (req: Request, res: Response) => {
    try {
        const patient = await create({
            name: req.body.name,
            lastName: req.body.lastName,
            birthDate: req.body.birthDate,
            gender: req.body.gender,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            isActive: req.body.isActive,
        });

        if (!patient) {
            return res.status(400).json(createTResult(null, "Patient not created"));
        }

        return res.status(201).json(createTResult(patient));
    } catch (error: any) {
        return res.status(500).json(createTResult(null, error.message));
    }
};

export const updatePatient = async (req: Request, res: Response) => {
    try {
        const patient = await update(Number(req.params.id), req.body);
        return res.status(200).json(createTResult(patient));
    } catch (error: any) {
        return res.status(500).json(createTResult(null, error.message));
    }
};

export const getAllPatients = async (req: Request, res: Response) => {
    try {
        const patients = await get();
        return res.status(200).json(createTResult(patients));
    } catch (error: any) {
        return res.status(500).json(createTResult(null, error.message));
    }
};

export const getPatientById = async (req: Request, res: Response) => {
    try {
        const patient = await getById(Number(req.params.id));
        return res.status(200).json(createTResult(patient));
    } catch (error: any) {
        return res.status(500).json(createTResult(null, error.message));
    }
};

export const removePatient = async (req: Request, res: Response) => {
    try {
        const patient = await remove(Number(req.params.id));
        return res.status(200).json(createTResult(patient));
    } catch (error: any) {
        return res.status(500).json(createTResult(null, error.message));
    }
};