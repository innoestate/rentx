import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable, switchMap, tap } from 'rxjs';
import { DatabaseError } from '../../errors/data.error';
import { Repository } from 'typeorm';
import { Owner_Entity } from '../../owners/owners.entity';
import { User } from './user.entity';
import { User_Dto } from '../models/user.dto.model';
import { User_Db } from '../models/user-db.model';
import { formatUserDb } from './utils/data.utils';

@Injectable()
export class UserDbService {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Owner_Entity) private ownerRepository: Repository<Owner_Entity>
    ) { }

    getByEmail(email: string): Observable<User_Db> {
        try {
            return from(this.usersRepository.findOne({
                where: { email }
            })).pipe(
                tap(user => {
                    if (!user) {
                        throw new NotFoundException('User by email not found.');
                    }
                }),
                map(user => formatUserDb(user))
            )
        } catch (err) {
            throw new DatabaseError('Error getting user by email: ' + err);
        }
    }

    getById(id: string): Observable<User_Db> {
        try {
            const user = this.usersRepository.findOne({
                where: { id },
                select: ['id', 'email']
            });

            if (!user) {
                throw new NotFoundException('User not found');
            }

            return from(user).pipe(
                map(user => formatUserDb(user))
            )
        } catch (err) {
            throw new DatabaseError('Error getting user by id: ' + err);
        }
    }

    create(user: User_Dto): Observable<User_Db> {
        try{
            return from(this.usersRepository.save(user)).pipe(
                map(user => formatUserDb(user))
            )
        }catch(err){
            throw new DatabaseError('Error creating user: ' + err);
        }
    }

    update(id: string, data: Partial<User>): Observable<User_Db> {
        try{
            return from(this.usersRepository.update(id, data)).pipe(
                switchMap(() => this.getById(id)),
            );
        }catch(err){
            throw new DatabaseError('Error updating user: ' + err);
        }
    }
}