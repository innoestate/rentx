import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { FolderStorageGoogleDriveStrategy } from './strategy/folder-storage.google_drive.strategy';

@Module({
    imports: [
        AuthModule,
    ],
    providers: [
        FolderStorageGoogleDriveStrategy,
    ],
    exports: [
        FolderStorageGoogleDriveStrategy,
    ],
})
export class StorageModule {}