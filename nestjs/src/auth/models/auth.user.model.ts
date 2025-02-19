import { GoogleProfile } from "./google.profile.model";

export interface AuthUser extends GoogleProfile {
    accessToken: string,
    refreshToken: string
}