import { Request, Response } from "express";
import { create, getAll, getByDoctorId, getById, getByPatientId, remove, update } from "./appointment.service";
import { createTResult } from "@src/core/mappers/tresult.mapper";

export const getAllAppointments = async (req: any, res: Response) => {
    try {
        let appointments;
        if (req.user.role === 'DOCTOR') {
            appointments = await getByDoctorId(req.user.doctorId);
        } else {
            appointments = await getAll();
        }
        res.json(createTResult(appointments));
    } catch (error) {
        res.status(500).json(createTResult(null, "Error al obtener las citas"));
    }
}

export const getAppointmentById = async (req: any, res: Response) => {
    try {
        const appointment = await getById(Number(req.params.id));

        if (req.user.role === 'DOCTOR' && appointment?.doctorId !== req.user.doctorId) {
            return res.status(403).json(createTResult(null, "No tienes permiso para ver esta cita"));
        }

        res.json(createTResult(appointment));
    } catch (error) {
        res.status(500).json(createTResult(null, "Error al obtener la cita"));
    }
}

export const getAppointmentByPatientId = async (req: any, res: Response) => {
    try {
        const appointments = await getByPatientId(Number(req.params.patientId));

        // Filter if doctor
        const filtered = req.user.role === 'DOCTOR'
            ? appointments.filter(a => a.doctorId === req.user.doctorId)
            : appointments;

        res.json(createTResult(filtered));
    } catch (error) {
        res.status(500).json(createTResult(null, "Error al obtener las citas"));
    }
}

export const getAppointmentByDoctorId = async (req: any, res: Response) => {
    try {
        const doctorId = Number(req.params.doctorId);

        if (req.user.role === 'DOCTOR' && doctorId !== req.user.doctorId) {
            return res.status(403).json(createTResult(null, "No tienes permiso para ver las citas de otro doctor"));
        }

        const appointments = await getByDoctorId(doctorId);
        res.json(createTResult(appointments));
    } catch (error) {
        res.status(500).json(createTResult(null, "Error al obtener las citas"));
    }
}

export const createAppointment = async (req: any, res: Response) => {
    try {
        if (req.user.role === 'DOCTOR' && req.body.doctorId !== req.user.doctorId) {
            return res.status(403).json(createTResult(null, "No puedes crear citas para otros doctores"));
        }

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

export const updateAppointment = async (req: any, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (req.user.role === 'DOCTOR') {
            const existing = await getById(id);
            if (existing?.doctorId !== req.user.doctorId) {
                return res.status(403).json(createTResult(null, "No tienes permiso para modificar esta cita"));
            }
            // Ensure they don't change the doctorId to someone else
            if (req.body.doctorId && req.body.doctorId !== req.user.doctorId) {
                return res.status(403).json(createTResult(null, "No puedes asignar la cita a otro doctor"));
            }
        }

        const appointment = await update(id, req.body);
        return res.status(200).json(createTResult(appointment));
    } catch (error: any) {
        return res.status(500).json(createTResult(null, error.message));
    }
}

export const removeAppointment = async (req: any, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (req.user.role === 'DOCTOR') {
            const existing = await getById(id);
            if (existing?.doctorId !== req.user.doctorId) {
                return res.status(403).json(createTResult(null, "No tienes permiso para eliminar esta cita"));
            }
        }

        const appointment = await remove(id);
        return res.status(200).json(createTResult(appointment));
    } catch (error: any) {
        return res.status(500).json(createTResult(null, error.message));
    }
}