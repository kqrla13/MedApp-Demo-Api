import { Request, Response } from "express";
import { create, get, getById, getByPatientId, getByAppointmentId, remove, update } from "./medicalConsultation.service";
import { createTResult } from "@src/core/mappers/tresult.mapper";

export const getAllConsultations = async (req: Request, res: Response) => {
    try {
        const consultations = await get();
        res.json(createTResult(consultations));
    } catch (error) {
        res.status(500).json(createTResult(null, "Error al obtener las consultas médicas"));
    }
}

export const getConsultationById = async (req: Request, res: Response) => {
    try {
        const consultation = await getById(Number(req.params.id));
        if (!consultation) {
            return res.status(404).json(createTResult(null, "Consulta médica no encontrada"));
        }
        res.json(createTResult(consultation));
    } catch (error) {
        res.status(500).json(createTResult(null, "Error al obtener la consulta médica"));
    }
}

export const getConsultationsByPatientId = async (req: Request, res: Response) => {
    try {
        const consultations = await getByPatientId(Number(req.params.patientId));
        res.json(createTResult(consultations));
    } catch (error) {
        res.status(500).json(createTResult(null, "Error al obtener las consultas del paciente"));
    }
}

export const getConsultationByAppointmentId = async (req: Request, res: Response) => {
    try {
        const consultation = await getByAppointmentId(Number(req.params.appointmentId));
        if (!consultation) {
            return res.status(404).json(createTResult(null, "Consulta médica no encontrada para esta cita"));
        }
        res.json(createTResult(consultation));
    } catch (error) {
        res.status(500).json(createTResult(null, "Error al obtener la consulta por cita"));
    }
}

export const createConsultation = async (req: Request, res: Response) => {
    try {
        const consultation = await create(req.body);
        res.status(201).json(createTResult(consultation));
    } catch (error: any) {
        res.status(500).json(createTResult(null, error.message));
    }
}

export const updateConsultation = async (req: Request, res: Response) => {
    try {
        const consultation = await update(Number(req.params.id), req.body);
        res.json(createTResult(consultation));
    } catch (error: any) {
        res.status(500).json(createTResult(null, error.message));
    }
}

export const removeConsultation = async (req: Request, res: Response) => {
    try {
        const consultation = await remove(Number(req.params.id));
        res.json(createTResult(consultation));
    } catch (error: any) {
        res.status(500).json(createTResult(null, error.message));
    }
}
