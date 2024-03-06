import { Pipe, PipeTransform } from '@angular/core';
import { product } from './core/shared/interfaces/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
 //[{}]
  transform(products:product[],trem:string): product[] {

    return products.filter((productres)=>productres.title.toLowerCase().includes(trem.toLowerCase()))
    
  }

}
