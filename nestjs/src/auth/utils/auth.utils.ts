import { Owner_Dto } from "../../owners/owners-dto.model";
import { User } from "../../user/user.entity";
import { AuthUser } from "../models/auth.user.model";

export const extractOwnerFromAuthUser = (user: AuthUser): Owner_Dto => {
    return {
        name: user.firstName ? user.firstName + ' ' : '' + (user.lastName ?? '')
    }
}

export const extractTokenDataFromAuthUser = (authUser: AuthUser, userDb: User) => {
    return {
        id: userDb.id,
        email: authUser.email,
        firstName: authUser.firstName,
        lastName: authUser.lastName,
        picture: authUser.picture,
        accessToken: authUser.accessToken,
        refresh_token: authUser.refreshToken
      }
}