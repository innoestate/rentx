import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { map, Observable, take, tap } from "rxjs";
import { UserDbService } from "../user/data/user.db.service";

@Injectable()
export class UserMidleweare implements CanActivate {

  constructor(private userDbService: UserDbService) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    if (req.user.id) {
      return this.userDbService.getById(req.user.id).pipe(
        map(user => ({ ...user, ...req.user })),
        tap(user => {
          if(req.user.refresh_token && req.user.refresh_token !== user.refresh_token){
            this.userDbService.update(req.user.id, {refresh_token: req.user.refresh_token}).pipe(
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

}