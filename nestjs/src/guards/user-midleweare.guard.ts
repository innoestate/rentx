import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { map, Observable, take, tap } from "rxjs";
import { UsersService } from "../user/services/user.service";

@Injectable()
export class UserMidleweare implements CanActivate {

  constructor(private usersService: UsersService) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    if (req.user.id) {
      return this.usersService.getById(req.user.id).pipe(
        map(user => ({ ...user, ...req.user })),
        tap(user => {
          if(req.user.refresh_token && req.user.refresh_token !== user.refresh_token){
            this.usersService.updateGoogleRefreshToken(req.user.id, req.user.refresh_token).pipe(
              take(1)
            ).subscribe();
          }
        }),
        tap(user => req.user = user),
        map(() => req),
      );
    }
    return false;
  }

  private formatGoogleUser(user: any) {
    let name = '';
    if (user.firstName && user.lastName) {
      name = user.firstName + ' ' + user.lastName;
    }
    return { ...user, name }
  }

}