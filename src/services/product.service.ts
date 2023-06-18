import { makeRequest } from '@/services'
import {
  HttpMethod,
  type CustomPropertiesRequestConfig,
} from '@/services/interfaces/request'
import { ServerDirections } from '@/config/server-directions'

function get() {
    const options: CustomPropertiesRequestConfig = {
      url: ServerDirections.PRODUCTS,
      method: HttpMethod.GET,
    }
  
    function map(data: any): any {
    //   const activity = camelCaseKeys(data.activity as CommonActivity, {
    //     deep: true,
    //   }) as Activit
      return data
    }
  
    return makeRequest<Any>(options, map)
  }
  
  const ProductService = {
    get,
  }
  
  export default ProductService