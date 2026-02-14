import { Request, Response } from "express";
import { create, getVitalSignByAppointmentId, remove, update } from "./vitalSign.service";
import { createTResult } from "@src/core/mappers/tresult.mapper";

export const createVitalSign = async (req: Request, res: Response) => {
    try {
        const vitalSign = await create({
            temperature: req.body.temperature,
            heartRate: req.body.heartRate,
            bloodPressure: req.body.bloodPressure,
            oxygenSaturation: req.body.oxygenSaturation,
            respiratoryRate: req.body.respiratoryRate,
            weight: req.body.weight,
            height: req.body.height,
            appointmentId: req.body.appointmentId,
        });

        if (!vitalSign) {
            return res.status(400).json(createTResult(null, "Vital sign not created"));
        }

        return res.status(201).json(createTResult(vitalSign));
    } catch (error: any) {
        return res.status(500).json(createTResult(null, error.message));
    }
};

export const getByAppointmentId = async (req: Request, res: Response) => {
    try {
        const vitalSign = await getVitalSignByAppointmentId(Number(req.params.id));
        return res.status(200).json(createTResult(vitalSign));
    } catch (error: any) {
        return res.status(500).json(createTResult(null, error.message));
    }
};

export const updateVitalSign = async (req: Request, res: Response) => {
    try {
        const vitalSign = await update(Number(req.params.id), req.body);
        return res.status(200).json(createTResult(vitalSign));
    } catch (error: any) {
        return res.status(500).json(createTResult(null, error.message));
    }
};

export const removeVitalSign = async (req: Request, res: Response) => {
    try {
        const vitalSign = await remove(Number(req.params.id));
        return res.status(200).json(createTResult(vitalSign));
    } catch (error: any) {
        return res.status(500).json(createTResult(null, error.message));
    }
};
