import express from 'express';
import { createTResult } from '../mappers/tresult.mapper';

export default function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    let token = req.header('Authorization');

    if (!token) return res.status(401).json(createTResult("", "No token provided"));
    next();
  } catch (error) {
    return res.status(401).json(error);
  }
}
