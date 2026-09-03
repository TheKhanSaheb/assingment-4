import type { Request, Response } from "express";

import { authService } from "./auth.service";
import { authValidation } from "./auth.validation";

import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/send-response";

const register = catchAsync(async (req: Request, res: Response) => {
  const data = authValidation.register.parse({
    body: req.body,
  });

  const result = await authService.register(data.body);

  sendResponse(res, {
    message: "User registered successfully",
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const data = authValidation.login.parse({
    body: req.body,
  });

  const result = await authService.login(data.body);

  sendResponse(res, {
    message: "Login successful",
    data: result,
  });
});

export const authController = {
  register,
  login,
};