import { Test } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { UsersService } from '../../user/user.service';
import { MockJwtAuthGuard } from '../../guards/auth.guard.mock';
import { JwtAuthGuard } from '../../auth/auth.guard';
import { User_Db } from '../../user/user-db.model';

export const buildUser = async (email: string, name = 'John Doe'): Promise<User_Db> => {
    const builderAppRef = await Test.createTestingModule({
        imports: [AppModule],
    }).compile();
    const userService = builderAppRef.get<UsersService>(UsersService);
    const user = await userService.create(email, {}).toPromise();
    return user as any;
}

export const buildApp = async (user: any) => {

    const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
    })
        .overrideGuard(JwtAuthGuard)
        .useValue(new MockJwtAuthGuard(user as any))
        .compile();

    const app = moduleRef.createNestApplication();
    await app.init();
    return app;
}