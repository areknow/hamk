import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private dbPath = '/tutorials';

  docRef: AngularFirestoreCollection<any> = null;

  constructor(private db: AngularFirestore) {
    this.docRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<any> {
    console.log(1);
    return this.docRef;
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
