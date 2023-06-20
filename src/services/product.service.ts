import { makeRequest } from '@/services'
import {
  HttpMethod,
  type CustomPropertiesRequestConfig,
} from '@/services/interfaces/request'
import { ServerDirections } from '@/config/server-directions'
import { IProduct } from '@/entities/interfaces/product';
import { Product } from '@/entities/classes/product'

function get({ page , limit, search }) {
    const options: CustomPropertiesRequestConfig = {
      url: ServerDirections.PRODUCTS,
      method: HttpMethod.GET,
      params: {
        page,
        limit,
        search,
      }
    }
  
    function map(data: any): IProduct {
      const productsList = data.products.data.map((product: IProduct) => {
        return new Product(product)
      })
      return productsList
    }
  
    return makeRequest<IProduct>(options, map)
  }
  
  const ProductService = {
    get,
  }
  
  export default ProductService