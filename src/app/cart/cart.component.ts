import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from '../products/product';
import { ProductService } from '../products/product.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'pm-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  requiredForm!: FormGroup;  
  products: IProduct[] = [];
  totalCost!:number;
  amount:number=1;
  @Input ()product: IProduct | undefined;
  sub!: Subscription;
  errorMessage = '';
  fullName:string |undefined;
  address:string |undefined;
  cardNumber:number |undefined;
  private _total = 0;
  name:string='';
  get total(): number {
    return this.totalCost*this.amount;
  }
  set total(value: number) {
    this._total = value;
    //this._total=this._total*this.amount;
  }
  @Output() ratingClicked: EventEmitter<string> =
    new EventEmitter<string>();
  constructor(private fb: FormBuilder,private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService ) {
      this.myForm();
}
myForm() {
  this.requiredForm = this.fb.group({
  name: ['', Validators.required ]
  });
}
  ngOnInit(): void {
    // const id = Number(this.route.snapshot.paramMap.get('id'));
    // console.log('hi');
    // if (id) {
    //   this.addProduct(id);
    //   console.log('hi');
    // }
    
    this.products = this.productService.getProductsCart();
    this.totalCost=this.productService.getTotal();
    console.log(this.totalCost);
    
  }
  onBack(): void {
    this.router.navigate(['/products']);
  }
  onSubmit(): void {
    this.router.navigate(['/welcome']);
  }
  addProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err
    });
    this.products.push(this.product!);
  }
  addAmount(qty:number,price:number){
    this.totalCost=price*qty;
    console.log(this.totalCost);
  }
   

  removeProduct(obj:IProduct){
    this.productService.cartProducts.forEach((element,index)=>{
      if(element==obj)  this.productService.cartProducts.splice(index,1);
   });
   this.totalCost=this.totalCost-(obj.price*obj.amount);
   this.productService.totalAmount=this.totalCost;
   if(this.productService.cartProducts.length==0){
    this.totalCost=0;
    this.total=0;
   }
   console.log('total cost'+this.totalCost);
  }

}
