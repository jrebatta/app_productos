import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-create-producto',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './create-producto.component.html',
  styleUrl: './create-producto.component.css'
})
export class CreateProductoComponent implements OnInit {

  product: Product = new Product();

  constructor(private productService: ProductService, private router: Router){}

  ngOnInit(): void {

  }

  save(){
    console.log("Invocando al registro de un producto: " + this.product);
    this.productService.createProducto(this.product).subscribe(
      data => {
        this.router.navigate(['/list']);
      },
      error => {
        console.error("Error al registrar producto: ", error);
        if (error.status === 400) {
          const errorMessage = error.error.message;
          window.alert(`Error: ${errorMessage}`);
        } else {
          window.alert("Ya existe un producto con ese nombre.");
        }
      }
    );
    console.log("...continuamos con la navegación...");
  }


}
