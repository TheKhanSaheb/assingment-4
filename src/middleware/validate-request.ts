import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";

const validateRequest = (schema: ZodType) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    next();
  };
};

export default validateRequest;