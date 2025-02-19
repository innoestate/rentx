import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { lastValueFrom } from 'rxjs';
import { AppModule } from '../../app.module';
import { JwtAuthGuard } from '../../auth/auth.guard';
import { MockJwtAuthGuard } from '../../guards/auth.guard.mock';
import { StorageService } from '../../storage/services/storage.service';
import { StorageMockedService } from '../../storage/tests/storage.mocked.service';
import { UsersService } from 'src/user/services/user.service';

export const buildApp = async (user: {email: string, name: string}) => {
    const moduleRef = await Test.createTestingModule({
        imports: [AppModule]
    })
        .overrideGuard(JwtAuthGuard)
        .useValue(new MockJwtAuthGuard(user as any))
        .overrideProvider(StorageService)
        .useClass(StorageMockedService)
        .compile();

    const app = moduleRef.createNestApplication();
    await app.init();
    await stakeUserInDb(app, user);
    return app;
}

const stakeUserInDb = async (app: INestApplication, user: {email: string, name: string}) => {
    const userService = app.get<UsersService>(UsersService);
    await lastValueFrom(userService.createWithOwner(user.email, { name: user.name }));
}