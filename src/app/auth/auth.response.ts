import { EGender, ESuscriptionPlan } from '../enums';

export interface AuthResponse {
    id: string;
    userName: string;
    email: string;
    token: string;
    suscriptionPlan: ESuscriptionPlan;
    genre: EGender;
}