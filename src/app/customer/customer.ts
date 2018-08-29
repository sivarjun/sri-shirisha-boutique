import { Blouse } from "./blouse";
import { IOrder } from "../shared/order";

export class Customer {
    Address: string;
    BlouseMesurement?: Blouse;
    CustomerId: number;
    Gender: string;
    IsDeleted: number;
    Name: string;
    Phone: number;

    constructor() {
        this.Address = "";
        this.BlouseMesurement=new Blouse();
        this.CustomerId = 0;
        this.Gender = null;
        this.IsDeleted = 0;
        this.Name = "";
        this.Phone = null;
    }


}