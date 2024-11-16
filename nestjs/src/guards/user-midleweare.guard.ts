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
    if( req.user.id ){
        return this.usersService.findById(req.user.id).pipe(
            map(user => ({...user, ...req.user})),
            tap(user  => req.user = user),
            map(() => req),
        );
    }else if (req.user.email) {
        return this.usersService.create(req.user.email).pipe(
            map(user => ({...user, ...req.user})),
            tap(user  => req.user = user),
            map(() => req),
        )
    }
    return false;
  }

}