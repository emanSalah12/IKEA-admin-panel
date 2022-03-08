export interface IOrder {
  id: string;
  CreatedAt: Date;
  Status: boolean;
  TotalPrice: number;
  UserID: string;
  CheckedAddress?: number;
  Items: {
    Amount: number;
    ProductID: string;
  }[];
}
