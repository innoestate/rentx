import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { map, Observable, tap } from "rxjs";
import { UsersService } from "../user/user.service";

@Injectable()
export class UserMidleweare implements CanActivate {

  constructor(private usersService: UsersService) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log('req.user', req.user);
    if (req.user.id) {
      return this.usersService.findById(req.user.id).pipe(
        map(user => ({ ...user, ...req.user })),
        tap(user => req.user = user),
        map(() => req),
      );
    } else if (req.user.email) {//we suppose that user is not registered yet
      const user = this.formatGoogleUser(req.user);
      return this.usersService.create(req.user.email, user).pipe(
        map(user => ({ ...user, ...req.user, firstRegistration: true })),
        tap(user => req.user = user),
        map(() => req),
      )
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