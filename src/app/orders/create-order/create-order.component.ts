import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Item } from '../../customer/item';
import { ItemsService } from '../../items.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {
  customerForm: FormGroup;
  listItems: Item[];
  get items(): FormArray {
    return <FormArray>this.customerForm.get('items');
  }


  constructor(private fb: FormBuilder, private itemsService: ItemsService) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      customerName: [{ value: ''}],
      customerCode: [{ value: ''}],
      customerPhone: [{ value: ''}],
      items: this.fb.array([this.BuildItems()])
    });
    this.itemsService.getItems().subscribe(
      items => {
        this.listItems = items
        console.log(items);
      }
    )
    this.customerForm.patchValue({
      customerName: 'Sivarjun',
      customerCode: 1030,
      customerPhone: 9790790450
    })

    

  }
  AddItems() {
    if (this.items.length <= 2)
      this.items.push(this.BuildItems());
  }
  deleteItem(index: number): void {
    this.items.removeAt(index);
  }

  BuildItems(): FormGroup {
    return this.fb.group({
      itemType: '',
      itemQty: '1',
      amount: '',
      totalAmount:''
    })
  }

  DisplayAmount(i: number): void {
   const controlArray = <FormArray>this.customerForm.get('items');
   const selectedItem = controlArray.controls[i].get('itemType').value;
   const amount=this.getItemStitchingCost(selectedItem);
    controlArray.controls[i].get('amount').setValue(amount);
  }
 
  DisplayTotalAmount(i: number): void {
    const controlArray = <FormArray>this.customerForm.get('items');
    const Qty = controlArray.controls[i].get('itemQty').value;

    const selectedItem = controlArray.controls[i].get('itemType').value;
    const cost=this.getItemStitchingCost(selectedItem);
    controlArray.controls[i].get('amount').setValue(cost);

    const totalAmount=this.ClaculateItemStitchingCost(Qty,cost);
     controlArray.controls[i].get('totalAmount').setValue(totalAmount);
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
}
