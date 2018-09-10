import { Blouse } from "./blouse";
import { IOrder } from "../shared/order";
import { Dress } from "./Dress";
import { Bottom } from "./Bottom";

export class Customer {
    BlouseMesurement?: Blouse;
    DressMesurement?: Dress;
    BottomMesurement?: Bottom;
    CustomerId: number;
    IsDeleted: number;
    Name: string;
    Phone: number;

    constructor() {
        this.BlouseMesurement=new Blouse();
        this.DressMesurement=new Dress();
        this.BottomMesurement=new Bottom();
        this.CustomerId = 0;
        this.IsDeleted = 0;
        this.Name = "";
        this.Phone = null;
    }


}