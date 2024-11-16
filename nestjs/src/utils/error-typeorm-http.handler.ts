import { HttpException, HttpStatus } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

export const handleTypeormError = (error: QueryFailedError) => {
    if(error.message.includes('duplicate key value violates unique constraint')) {  
        throw new HttpException({
            status: HttpStatus.CONFLICT,
            message: 'Cette ressource existe déjà.',
            }, HttpStatus.CONFLICT, {
            cause: error
            });
    }
}