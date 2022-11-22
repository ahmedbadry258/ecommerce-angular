import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router';
import { ProductModule } from './products/product.module';
import { CartComponent } from './cart/cart.component';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'cart', component: CartComponent },
      {path: 'products',  redirectTo: 'products', pathMatch: 'full'},  
      { path: '**', redirectTo: 'products', pathMatch: 'full' }
      
    ]),
    ProductModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
