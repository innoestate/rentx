
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { User_Db } from '../user/user-db.model';

@Injectable()
export class MockJwtAuthGuard implements CanActivate {
    private mockUser: any;

    constructor(mockUser: User_Db) {
        this.mockUser = mockUser;
    }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        request.user = this.mockUser; 
        return true;
    }
}