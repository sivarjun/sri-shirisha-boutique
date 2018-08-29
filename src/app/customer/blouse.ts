export class Blouse {
    AroundAboveWaist:number;
    AroundArm:number;
    BackNeckDepth:number;
    BlouseId:number;
    BlouseLength:number;
    Bust:number;
    CreatedDate:Date;
    CustomerId:number;
    FrontNeckDepth:number;
    SleeveLength:number;
    IsDeleted:number;
    ItemId:number;
  
    constructor()
    {
        this.AroundAboveWaist=null;
        this.AroundArm=null;
        this.BackNeckDepth=null;
        this.BlouseId=null;
        this.BlouseLength=null;
        this.Bust=null;
        this.CreatedDate=new Date();
        this.CustomerId=null;
        this.FrontNeckDepth=null;
        this.SleeveLength=null;
        this.IsDeleted=0;
        this.ItemId=null;
    }
  
}