import { DocumentData, DocumentReference } from '@angular/fire/firestore';

export interface CategoryInterface {
  id: string;
  name: string;
  color: string;
  amountMax: number;
  spent: number;
  userId: DocumentReference<DocumentData, DocumentData> | string;
}

export type CreateCategory = Omit<CategoryInterface, 'id'>;
