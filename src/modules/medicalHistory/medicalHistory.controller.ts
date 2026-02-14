import { Request, Response } from "express";
import { create, get, getByPatientId, remove, updateByPatientId } from "./medicalHistory.service";
import { createTResult } from "@src/core/mappers/tresult.mapper";

export const getAllMedicalHistories = async (req: Request, res: Response) => {
    try {
        const histories = await get();
        res.json(createTResult(histories));
    } catch (error) {
        res.status(500).json(createTResult(null, "Error al obtener los historiales médicos"));
    }
}

export const getMedicalHistoryByPatientId = async (req: Request, res: Response) => {
    try {
        const history = await getByPatientId(Number(req.params.patientId));
        if (!history) {
            return res.status(404).json(createTResult(null, "Historial médico no encontrado"));
        }
        res.json(createTResult(history));
    } catch (error) {
        res.status(500).json(createTResult(null, "Error al obtener el historial médico"));
    }
}

export const createMedicalHistory = async (req: Request, res: Response) => {
    try {
        const history = await create(req.body);
        res.status(201).json(createTResult(history));
    } catch (error: any) {
        if (error.code === 'P2002') {
            return res.status(400).json(createTResult(null, "El paciente ya tiene un historial médico"));
        }
        res.status(500).json(createTResult(null, error.message));
    }
}

export const updateMedicalHistory = async (req: Request, res: Response) => {
    try {
        const history = await updateByPatientId(Number(req.params.patientId), req.body);
        res.json(createTResult(history));
    } catch (error: any) {
        res.status(500).json(createTResult(null, error.message));
    }
}

export const removeMedicalHistory = async (req: Request, res: Response) => {
    try {
        const history = await remove(Number(req.params.patientId));
        res.json(createTResult(history));
    } catch (error: any) {
        res.status(500).json(createTResult(null, error.message));
    }
}
