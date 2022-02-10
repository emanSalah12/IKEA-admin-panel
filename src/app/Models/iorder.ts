export interface IOrder {
    CreatedAt:Date,
    Status:boolean,
    TotalPrice:number,
    UserID:string,
    Items:{
        Amount:number,
        ProductID:string
    }[]
}
