import { User_Db } from "src/user/models/user-db.model";
import { Owner_Dto } from "../../owners/owners-dto.model";
import { AuthUser } from "../models/auth.user.model";

export const extractOwnerFromAuthUser = (user: AuthUser): Owner_Dto => {
    return {
        name: user.firstName ? user.firstName + ' ' : '' + (user.lastName ?? ''),
        email: user.email
    }
}

export const extractTokenDataFromAuthUser = (authUser: AuthUser, userDb: User_Db) => {
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