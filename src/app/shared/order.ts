export interface IOrder {

    OrderId:number;
    CustomerId:number;
    ItemCount?:number;
    OrderItemDetails:string;
    OrderDate:Date;
    DelivaryDateL:Date;
    IsDeleted:number;
    UpdatedDateTime:Date;

}