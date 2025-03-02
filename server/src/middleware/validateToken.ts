import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Define a custom interface for the request object
export interface AuthenticatedRequest extends Request {
  user?: { userId: string }; // Add the user property
}

export const validateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token: string | undefined = req.header('authorization')?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access denied, missing token' });
    return; // Exit the function after sending the response
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET as string) as { userId: string };
    req.user = { userId: verified.userId }; // Attach userId to req.user
    next(); // Pass control to the next middleware or route handler
  } catch (error: any) {
    res.status(400).json({ message: 'Access denied, invalid token' });
  }
};