import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Listing } from '../models/listing';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private dbPath = '/listings';

  docRef: AngularFirestoreCollection<any> = null;

  private _listings: Listing[];

  get listings(): Listing[] {
    return this._listings;
  }

  constructor(private db: AngularFirestore) {
    this.docRef = db.collection(this.dbPath);
    this.getAll()
      .snapshotChanges()
      .pipe(map(changes => changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))))
      .subscribe(data => {
        this._listings = data;
      });
  }

  getAll(): AngularFirestoreCollection<any> {
    return this.docRef;
  }

  async get(id: string) {
    return (await this.db.collection(this.dbPath).doc(id).get().toPromise()).data();
  }

  create(tutorial: any): any {
    return this.docRef.add({ ...tutorial });
  }

  update(id: string, data: any): Promise<void> {
    return this.docRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.docRef.doc(id).delete();
  }
}
