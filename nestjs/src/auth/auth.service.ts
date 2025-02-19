import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { catchError, map } from 'rxjs';
import { UsersService } from '../user/services/user.service';
import { UserDbService } from '../user/services/user.db.service';
import { AuthUser } from './models/auth.user.model';
import { extractOwnerFromAuthUser, extractTokenDataFromAuthUser } from './utils/auth.utils';

@Injectable()
export class AuthService {

  constructor(private jwtService: JwtService, private userService: UsersService, private userServiceDb: UserDbService) { }

  googleLogin(req: { user: AuthUser }) {
    if (!req.user) {
      return 'No user from google';
    }

    return this.userServiceDb.getByEmail(req.user.email).pipe(
      catchError(() => {
        const ownerData = extractOwnerFromAuthUser(req.user);
        return this.userService.createWithOwner(req.user.email, ownerData);
      }),
      map(userDb => {

        const formatedUserForToken = extractTokenDataFromAuthUser(req.user, userDb);
        const token = this.jwtService.sign(formatedUserForToken);

        return {
          message: 'User from google',
          user: req.user,
          token,
        };

      })
    );
  }
}