import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Product, CreateProductDTO } from "../../../models/product.model";
import { StoreService } from "../../../services/store.service";
import { ProductsService } from "../../../services/products.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent{
  myCart: Product[] = [];
  total = 0;

  @Input() products: Product[] = [];
  @Input()
  set productId(id: string | null){
    if (id) {
      this.onShowDetail(id);
    }
  }

  // today = new Date();
  // date = new Date(2021, 1, 21);

  showProductDetail = false;

  productChosen: Product= {
    id: '',
    title: '',
    price: 0,
    description: '',
    category: {
      id: 0,
      name: '',
      typeImg: ''
    },
    images: [],
  };

  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
    ) {
    this.myCart = this.storeService.getMyCart();
  }

  onAddedToCart(product: Product){
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string){
    this.statusDetail = 'loading';
    this.productsService.getProduct(id)
    .subscribe({
      next: (data) => {
        if(!this.showProductDetail){
          this.showProductDetail = true;
        }
        this.productChosen = data;
        this.statusDetail = 'success';
      },
      error: (errorMsg) => {
        this.statusDetail = 'error';
        Swal.fire({
          title: 'Error!',
          text: errorMsg,
          icon: 'error',
          confirmButtonText: 'ok',
        });
      }
    });
  }

  readAndUpdate(id: string){
    // this.productsService.getProduct(id)
    // .pipe(
    //   switchMap( (product) => {
    //     return this.productsService.update(product.id, {title: 'cambio'})
    //   })
    // )
    // .subscribe( data => {
    //   console.log(data);
    // })

    this.productsService.fetchReadAndUpdate(id, {title: "nuevo"})
    .subscribe( response => {
      const read = response[0];
      const update = response[1];
    })
  }

  createNewProduct(){
    const prod: CreateProductDTO = {
      title: 'Nuevo producto',
      price: 1230,
      description: 'dsfeereadsa',
      categoryId: 2,
      images: ["sdasd"],
    }
    this.productsService.create(prod)
    .subscribe( data => {
      this.products.unshift(data);
    })
  }

  updateProduct(){
    const changes: Partial<CreateProductDTO> = {
      title: 'Nuevo titulo',
    };
    const id = this.productChosen.id;
    this.productsService.update(id, changes)
    .subscribe( data => {
      const index = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[index] = data;
      this.productChosen = data;
    });
  }

  deleteProduct(){
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe( () => {
      const index = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(index, 1);
      this.showProductDetail = false;
      })
  }

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onLoadMore: EventEmitter<string> = new EventEmitter<string>();

  loadMore(){
    console.log("load more");

    this.onLoadMore.emit();
  }

}
