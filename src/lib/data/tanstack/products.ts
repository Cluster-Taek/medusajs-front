import { ProductDTO, StoreProduct } from "@medusajs/types"
import { useQuery } from "@tanstack/react-query"
import { IPagingParams, IPagingResponse } from "types/paging"
import { sdk } from "@lib/config"

export interface IProductsResponse extends IPagingResponse {
  brands: StoreProduct[]
}

export interface IBrandProductsResponse extends IPagingResponse {
  products: ProductDTO[]
}

export interface IBrandFormValues {
  name: string
  description?: string
}

export const useProducts = (params?: IPagingParams) => {
  const requestParams = new URLSearchParams(params as any).toString()

  return useQuery<IProductsResponse>({
    queryFn: () =>
      sdk.client
        .fetch<IProductsResponse>(`/store/products`)
        .then(({ brands, count }) => {
          return {
            brands,
            count,
            limit: params?.limit || 12,
            page: params?.page || 1,
          }
        }),
    queryKey: ["brands", params],
  })
}
