import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Item } from '../../customer/item';
import { ItemsService } from '../../items.service';
import { ActivatedRoute } from '@angular/router';
import { Subscribable, Subscription } from 'rxjs';
import { Customer } from '../../customer/customer';
import { CustomerDataService } from '../../customer/customer-data.service';
import { BotiqueError } from '../../shared/botique-error';
import { Input } from '@angular/core';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {
  customerForm: FormGroup;
  listItems: Item[];
  id:number;
  sub:Subscription;
  customer:Customer;


  minDate = new Date();
  




  get items(): FormArray {
    return <FormArray>this.customerForm.get('items');
  }

  constructor(private fb: FormBuilder,
     private itemsService: ItemsService,
     private route:ActivatedRoute,
     private customerService:CustomerDataService
    ) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      customerName: [{ value: ''}],
      customerCode: [{ value: ''}],
      customerPhone: [{ value: ''}],
      items: this.fb.array([this.BuildItems()]),
      advancePaid:'',
      balanceAmount:['',[Validators.required]],
      grandTotal:['',[Validators.required]],
      delivaryDate:[null,[Validators.required]]

    });
    this.itemsService.getItems().subscribe(
      items => {
        this.listItems = items
        console.log(items);
      }
    )
    this.sub = this.route.params.subscribe(
      params => {
        this.id = +params['id'];
        this.getCustomer(this.id);
      });

  }

ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  this.sub.unsubscribe();
}



  AddItems() {
    if (this.items.length <= 2)
    {
      this.items.push(this.BuildItems());
      this.customerForm.get('items').setValidators;
    }
  }
  deleteItem(index: number): void {
    this.items.removeAt(index);
    this.CalGrandTotal();
  }


private  CalGrandTotal()
  {
    const controlArray = <FormArray>this.customerForm.get('items');
    let Gt=0;
    for(let item of controlArray.controls)
    {
     Gt=Gt+item.get('totalAmount').value;
    }
     this.customerForm.get('grandTotal').setValue(Gt);

     let balAmt=this.customerForm.get('grandTotal').value - this.customerForm.get('advancePaid').value;
     this.customerForm.get('balanceAmount').setValue(balAmt);

  }

  BuildItems(): FormGroup {
    return this.fb.group({
      itemType: ['',[Validators.required]],
      itemQty: [1,[Validators.required,
        Validators.min(1),Validators.max(10)]],
      amount: ['',[Validators.required]],
      totalAmount:['',[Validators.required]]
    })
  }

  
 
  DisplayTotalAmount(i: number): void {
    const controlArray = <FormArray>this.customerForm.get('items');
    const Qty = controlArray.controls[i].get('itemQty').value;

    const selectedItem = controlArray.controls[i].get('itemType').value;
    const cost=controlArray.controls[i].get('amount').value;
  

    const totalAmount=this.ClaculateItemStitchingCost(Qty,cost);
     controlArray.controls[i].get('totalAmount').setValue(totalAmount);
     
     this.CalGrandTotal();

  }

  UpdateBalanceAmt()
  {
    let balAmt=this.customerForm.get('grandTotal').value - this.customerForm.get('advancePaid').value;
    this.customerForm.get('balanceAmount').setValue(balAmt);
  }

  placeOrder(){
     console.log(this.customerForm.value);
   }

private getItemStitchingCost(itemType:string):number{
        return  this.listItems.find(item=>item.Name==itemType).StitchingCost;
  }
private ClaculateItemStitchingCost(qty:number,itemCost:number)
{
      return qty*itemCost;
}
private getCustomer(id: number) {
  
    this.customerService.getCustomer(id).subscribe(
      (data: Customer) => {
        this.customer = data;
        this.customerForm.patchValue({
          customerName: this.customer.Name,
          customerCode: this.customer.CustomerId,
          customerPhone: this.customer.Phone
        })
        console.log(data);
      },
      (err: BotiqueError) =>
        console.log(`Error code : ${err.ErrorNumber} , message : ${err.frndlyMessage}`)
    );
  


}

}
