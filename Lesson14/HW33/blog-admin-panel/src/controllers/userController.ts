import { Request, Response } from "express";
import { User } from "../models/user";

export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      res.status(400).json({ message: errorMessage });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      res.status(400).json({ message: errorMessage });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      res.status(400).json({ message: errorMessage });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(204).send();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      res.status(400).json({ message: errorMessage });
    }
  }
}
