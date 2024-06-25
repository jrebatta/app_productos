import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgIf, NgFor, RouterModule, HttpClientModule, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    console.log("Reload Data!!!")
    this.productService.getProductList().subscribe(products => this.products = products);
  }

  deleteProducto(codigo: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productService.deleteProducto(codigo).subscribe(
        () => {
          console.log(`Producto con código ${codigo} eliminado.`);
          this.reloadData(); // Recargar la lista de productos después de eliminar
        },
        error => console.error('Error al eliminar el producto', error)
      );
    }
  }
}
