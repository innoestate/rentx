import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { User_Db } from '../user/models/user-db.model';
import { OwnersService } from '../owners/owners.service';
import { UserDbService } from '../user/data/user.db.service';
import { AuthUser } from './models/auth.user.model';
import { extractOwnerFromAuthUser, extractTokenDataFromAuthUser } from './utils/auth.utils';

@Injectable()
export class AuthService {

  constructor(private jwtService: JwtService, private ownerServiceDb: OwnersService, private userServiceDb: UserDbService) { }

  googleLogin(req: { user: AuthUser }) {
    if (!req.user) {
      return 'No user from google';
    }
    return this.userServiceDb.getByEmail(req.user.email).pipe(
      catchError(() => this.createNewUserWithAffiliatedOwner(req.user)),
      map(userDb => this.tokenizeUser(req.user, userDb)),
      map(token => ({ user: req.user, token })),
    );
  }

  private tokenizeUser(authUser: AuthUser, user: User_Db) {
    const formatedUserForToken = extractTokenDataFromAuthUser(authUser, user);
    return this.jwtService.sign(formatedUserForToken);
  }

  private createNewUserWithAffiliatedOwner(authUser: AuthUser): Observable<User_Db> {
    const ownerData = extractOwnerFromAuthUser(authUser);
    return this.userServiceDb.create({ email: authUser.email, refresh_token: authUser?.refreshToken }).pipe(
      switchMap(createdUser => {
        return this.ownerServiceDb.create({ ...ownerData, user_id: createdUser.id, }).pipe(
          map(() => createdUser),
          catchError(() => {
            return of(createdUser);
          })
        )
      })
    )
  }
}