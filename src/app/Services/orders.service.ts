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
        id:'1'
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
        id:'2'
      },
      {
        CreatedAt: new Date(),
        Status: false,
        TotalPrice: 3000,
        UserID: 'ygygy',
        Items: [
          {
            Amount: 3,
            ProductID: 'lkllh',
          },
        ],
        id:'3'
      },
      {
        CreatedAt: new Date(),
        Status: true,
        TotalPrice: 4000,
        UserID: 'ygygy',
        Items: [
          {
            Amount: 3,
            ProductID: 'lkllh',
          },
        ],
        id:'4'
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
        id:'5'
      },
      {
        CreatedAt: new Date(),
        Status: false,
        TotalPrice: 6000,
        UserID: 'klljkjkj',
        Items: [
          {
            Amount: 5,
            ProductID: '5454',
          },
        ],
        id:'6'
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
        id:'7'
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
        id:'8'
      },
      {
        CreatedAt: new Date(),
        Status: true,
        TotalPrice: 7000,
        UserID: 'ygygy',
        Items: [
          {
            Amount: 3,
            ProductID: 'lkllh',
          },
        ],
        id:'9'
      },
      {
        CreatedAt: new Date(),
        Status: false,
        TotalPrice:8000,
        UserID: 'ygygy',
        Items: [
          {
            Amount: 3,
            ProductID: 'lkllh',
          },
        ],
        id:'10'
      },
    ];
  }

  getOrders(): IOrder[] {
    return this.orders;
  }
}
