import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    username: string;
    password: string;
    refreshToken?: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
    saveRefreshToken(token: string): Promise<void>;
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: { type: String }
});

// Метод для порівняння паролів
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

// Метод для збереження refresh токена
UserSchema.methods.saveRefreshToken = async function (token: string): Promise<void> {
    this.refreshToken = token;
    await this.save();
};

export const User = mongoose.model<IUser>('User', UserSchema);