import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { jwtService } from '../services/jwtService';

class AuthController {
    login = async (req: Request, res: Response) => {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const accessToken = jwtService.generateAccessToken({ id: user._id.toString(), username: user.username });
        const refreshToken = jwtService.generateRefreshToken({ id: user._id.toString(), username: user.username });

        // Store refresh token in the database or in-memory store
        await user.saveRefreshToken(refreshToken);

        res.json({ accessToken, refreshToken });
    };

    refreshToken = async (req: Request, res: Response) => {
        const { token } = req.body;

        if (!token) {
            return res.sendStatus(401);
        }

        const user = await User.findOne({ refreshToken: token });

        if (!user) {
            return res.sendStatus(403);
        }

        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string, (err: any) => {
            if (err) {
                return res.sendStatus(403);
            }

            const accessToken = jwtService.generateAccessToken({ id: user._id.toString(), username: user.username });
            res.json({ accessToken });
        });
    };
}

export const authController = new AuthController();