import { Request, Response } from "express";
import { createTResult } from "@src/core/mappers/tresult.mapper";
import { fetchSpecialties, fetchDoctors } from "./catalog.service";

export const getSpecialties = async (req: Request, res: Response) => {
    try {
        const specialties = await fetchSpecialties();
        return res.status(200).json(createTResult(specialties));
    } catch (error: any) {
        return res.status(500).json(createTResult("", error.message));
    }
};

export const getDoctors = async (req: Request, res: Response) => {
    try {
        const doctors = await fetchDoctors();
        return res.status(200).json(createTResult(doctors));
    } catch (error: any) {
        return res.status(500).json(createTResult("", error.message));
    }
};
