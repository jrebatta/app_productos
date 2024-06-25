import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit {
  producto: Product = new Product();

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log("....UpdateProductComponent...");
    const id = this.activatedRoute.snapshot.params['codigo'];
    this.productService.details(id).subscribe(data => this.producto = data);
  }

  update(): void {
    console.log("Invocando la actualización de un producto: " + this.producto);
    this.productService.updateProducto(this.producto.codigo, this.producto).subscribe(
      data => {
        console.log("Producto actualizado: " + data);
        this.router.navigate(['/list']);
      },
      error => console.error('Error al actualizar el producto', error)
    );
    console.log("...continuamos con la navegación...");
  }

  volver(): void {
    this.router.navigate(['/list']);
  }
}
