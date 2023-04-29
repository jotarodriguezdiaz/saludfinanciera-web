import { EGender, ESuscriptionPlan } from "../enums";

export interface RegistrationResponse {
    id: string;
    userName: string;
    email: string;
    token: string;
    suscriptionPlan: ESuscriptionPlan;
    gender: EGender;
}