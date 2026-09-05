
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

const getMe = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const result = await authService.getMe(userId);

    sendResponse(res, {
      message: "User retrieved successfully",
      data: result,
    });
  }
);

const updateProfile = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const data = authValidation.updateProfile.parse({
      body: req.body,
    });

    const result = await authService.updateProfile(
      userId,
      data.body
    );

    sendResponse(res, {
      message: "Profile updated successfully",
      data: result,
    });
  }
);

export const authController = {
  register,
  login,
  getMe,
  updateProfile,
};

