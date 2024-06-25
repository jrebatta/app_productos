import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
//import { Router } from 'express';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgIf],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  producto: Product

  constructor(
    private productService: ProductService,
    private activateRouter: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    console.log("....ProductDetailsComponent...");
    //Obtener el id del producto para mostrar el detalle correspondiente
    const id = this.activateRouter.snapshot.params['codigo'];
    //Invocamos al servicio enviandole el id del producto seleccionado
    this.productService.details(id).subscribe(data => this.producto=data);
  }

  //Retornamos a la opción de listado de productos
  volver(): void{
    this.router.navigate(['/list']);
  }

}
