import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Owner_Dto } from 'src/app/core/models/dtos/owner.dto.model';
import { Owner_Post_Request } from 'src/app/core/models/requests/owner-post-request.model';

@Injectable({
  providedIn: 'root'
})
export class MockOwnersService {

  private owners: Owner_Dto[] = [
    { id: 'owner1', user_id: 'user1', name: 'Owner 1', street: 'Street 1', city: 'City 1', zip: '12345', signature: 'Signature 1', email: 'owner1@example.com', phone: '1234567890' },
    { id: 'owner2', user_id: 'user2', name: 'Owner 2', street: 'Street 2', city: 'City 2', zip: '67890', signature: 'Signature 2', email: 'owner2@example.com', phone: '0987654321' }
  ];

  get(): Observable<Owner_Dto[]> {
    return of([...this.owners]);
  }

  create(owner: Owner_Post_Request): Observable<Owner_Dto> {
    const newOwner: Owner_Dto = {
      id: (this.owners.length + 1).toString(),
      user_id: 'user1',
      name: owner.name,
      street: owner.street,
      city: owner.city,
      zip: owner.zip,
      signature: 'owner.signature',
      email: '',
      phone: ''
    };

    this.owners = [...this.owners, newOwner];
    return of(newOwner);
  }

  editOwner(owner: Owner_Dto): Observable<Owner_Dto> {
    const index = this.owners.findIndex(o => o.id === owner.id);
    if (index !== -1) {
      this.owners = [...this.owners.slice(0, index), owner, ...this.owners.slice(index + 1)];
      return of(this.owners[index]);
    }
    return of(owner);
  }

  deleteOwner(ownerId: string): Observable<boolean> {
    const index = this.owners.findIndex(o => o.id === ownerId);
    if (index !== -1) {
      this.owners = [...this.owners.slice(0, index), ...this.owners.slice(index + 1)];
      return of(true);
    }
    return of(false);
  }
}
