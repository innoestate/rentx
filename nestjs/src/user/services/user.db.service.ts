import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, map, Observable, of, switchMap, tap } from 'rxjs';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { Owner_Entity } from '../../owners/owners.entity';

@Injectable()
export class UserDbService {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Owner_Entity) private ownerRepository: Repository<Owner_Entity>
    ) { }

    getByEmail(email: string): Observable<User> {
        try {
            return from(this.usersRepository.findOne({
                where: { email }
            })).pipe(
                tap(user => {
                    if(!user){
                        throw new NotFoundException('User not found');
                    }  
                })
            )
        }catch(err){
            console.log('Error getting user: ', err);
            throw err;
        }
    }

    getById(id: string): Observable<User> {
        const user = this.usersRepository.findOne({
          where: { id },
          select: ['id', 'email']
        });
    
        if (!user) {
          throw new NotFoundException('User not found');
        }
    
        return from(user);
    }

    create(email: string, data: any): Observable<User> {
        return this.getByEmail(email).pipe(
            catchError(err => {
                const user = this.usersRepository.create({
                    email
                });
                return from(this.usersRepository.save(user)).pipe(
                    switchMap(createdUser => {
                        const owner = this.ownerRepository.create({
                            user_id: createdUser.id,
                            email,
                            name: data?.name ?? '',
                            street: data?.street ?? '',
                            city: data?.city ?? '',
                            zip: data?.zip ?? '',
                            signature: data?.signature ?? '',
                            phone: data?.phone ?? ''
                        });
                        return from(this.ownerRepository.save(owner)).pipe(
                            map(() => createdUser),
                            catchError(err => {
                                console.log('Error creating owner: ', err);
                                return of(createdUser);
                            })
                        );
                    })
                );
            })
        );
    }
}