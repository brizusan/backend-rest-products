import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const handleInpuntErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('desde middleware handleInpuntErrors')
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
