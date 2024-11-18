import { OwnersService } from "src/owners/owners.service";
import { UsersService } from "./user.service"
import { switchMap } from "rxjs";

export class UserBuisness {

    constructor(private userService: UsersService, private ownerService: OwnersService) { }
 
    create(email: string, name?: string) {
        return this.ownerService.create({email, name}).pipe(
            switchMap(owner => this.userService.create(owner.id))
        );
        return this.userService.create(email);
    }

}