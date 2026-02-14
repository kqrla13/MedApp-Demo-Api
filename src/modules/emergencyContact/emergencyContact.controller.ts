import { Request, Response } from "express";
import { create, getByPatientId, remove, update } from "./emergencyContact.service";
import { createTResult } from "@src/core/mappers/tresult.mapper";

export const getByPatientIdController = async (req: Request, res: Response) => {
    try {
        const emergencyContacts = await getByPatientId(Number(req.params.patientId));
        return res.status(200).json(createTResult(emergencyContacts));
    } catch (error: any) {
        return res.status(500).json(createTResult(null, error.message));
    }
}

export const createEmergencyContact = async (req: Request, res: Response) => {
    try {
        const emergencyContact = await create(req.body);
        return res.status(201).json(createTResult(emergencyContact));
    } catch (error: any) {
        return res.status(500).json(createTResult(null, error.message));
    }
}

export const updateEmergencyContact = async (req: Request, res: Response) => {
    try {
        const emergencyContact = await update(Number(req.params.id), req.body);
        return res.status(200).json(createTResult(emergencyContact));
    } catch (error: any) {
        return res.status(500).json(createTResult(null, error.message));
    }
}

export const removeEmergencyContact = async (req: Request, res: Response) => {
    try {
        const emergencyContact = await remove(Number(req.params.id));
        return res.status(200).json(createTResult(emergencyContact));
    } catch (error: any) {
        return res.status(500).json(createTResult(null, error.message));
    }
}