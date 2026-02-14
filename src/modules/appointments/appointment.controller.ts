import { Request, Response } from "express";
import { create, getAll, getByDoctorId, getById, getByPatientId, remove, update } from "./appointment.service";
import { createTResult } from "@src/core/mappers/tresult.mapper";

export const getAllAppointments = async (req: Request, res: Response) => {
    try {
        const appointments = await getAll();
        res.json(createTResult(appointments));
    } catch (error) {
        res.status(500).json(createTResult(null, "Error al obtener las citas"));
    }
}

export const getAppointmentById = async (req: Request, res: Response) => {
    try {
        const appointment = await getById(Number(req.params.id));
        res.json(createTResult(appointment));
    } catch (error) {
        res.status(500).json(createTResult(null, "Error al obtener la cita"));
    }
}

export const getAppointmentByPatientId = async (req: Request, res: Response) => {
    try {
        const appointment = await getByPatientId(Number(req.params.patientId));
        res.json(createTResult(appointment));
    } catch (error) {
        res.status(500).json(createTResult(null, "Error al obtener la cita"));
    }
}

export const getAppointmentByDoctorId = async (req: Request, res: Response) => {
    try {
        const appointment = await getByDoctorId(Number(req.params.doctorId));
        res.json(createTResult(appointment));
    } catch (error) {
        res.status(500).json(createTResult(null, "Error al obtener la cita"));
    }
}

export const createAppointment = async (req: Request, res: Response) => {
    try {
        const appointment = await create({
            patientId: req.body.patientId,
            doctorId: req.body.doctorId,
            date: req.body.date,
            time: req.body.time,
            reason: req.body.reason,
            status: req.body.status,
            specialty: req.body.specialty,
        });

        if (!appointment) {
            return res.status(400).json(createTResult(null, "Error al crear la cita"));
        }

        return res.status(201).json(createTResult(appointment));
    } catch (error: any) {
        return res.status(500).json(createTResult(null, error.message));
    }
}

export const updateAppointment = async (req: Request, res: Response) => {
    try {
        const appointment = await update(Number(req.params.id), req.body);
        return res.status(200).json(createTResult(appointment));
    } catch (error: any) {
        return res.status(500).json(createTResult(null, error.message));
    }
}

export const removeAppointment = async (req: Request, res: Response) => {
    try {
        const appointment = await remove(Number(req.params.id));
        return res.status(200).json(createTResult(appointment));
    } catch (error: any) {
        return res.status(500).json(createTResult(null, error.message));
    }
}