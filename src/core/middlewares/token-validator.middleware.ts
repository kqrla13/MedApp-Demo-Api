import express from 'express';
import { createTResult } from '../mappers/tresult.mapper';
import { verifyToken } from '../utils/security';

export default async function (
  req: any,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader) return res.status(401).json(createTResult("", "No token provided"));

    const token = authHeader.replace('Bearer ', '');
    const decoded = await verifyToken(token);

    if (!decoded) {
      return res.status(401).json(createTResult("", "Invalid token"));
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json(createTResult("", "Authentication failed"));
  }
}
