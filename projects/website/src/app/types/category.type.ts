export interface CategoryInterface {
  id: string;
  name: string;
  color: string;
  amountMax: number;
  spent: number;
  userId: string;
}

export type CreateCategory = Omit<CategoryInterface, 'id'>;