import { Injectable } from '@angular/core';
import { IOrder } from '../Models/iorder';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  orders: IOrder[];
  constructor() {
    this.orders = [
      {
        CreatedAt: new Date(),
        Status: false,
        TotalPrice: 1000,
        UserID: 'klljkjkj',
        Items: [
          {
            Amount: 5,
            ProductID: '5454',
          },
        ],
      },
      {
        CreatedAt: new Date(),
        Status: true,
        TotalPrice: 2000,
        UserID: 'ygygy',
        Items: [
          {
            Amount: 3,
            ProductID: 'lkllh',
          },
        ],
      },
      {
        CreatedAt: new Date(),
        Status: false,
        TotalPrice: 5000,
        UserID: 'ygygy',
        Items: [
          {
            Amount: 3,
            ProductID: 'lkllh',
          },
        ],
      },
      {
        CreatedAt: new Date(),
        Status: true,
        TotalPrice: 2000,
        UserID: 'ygygy',
        Items: [
          {
            Amount: 3,
            ProductID: 'lkllh',
          },
        ],
      },
      {
        CreatedAt: new Date(),
        Status: false,
        TotalPrice: 5000,
        UserID: 'ygygy',
        Items: [
          {
            Amount: 3,
            ProductID: 'lkllh',
          },
        ],
      },
    ];
  }

  getOrders(): IOrder[] {
    return this.orders;
  }
}
