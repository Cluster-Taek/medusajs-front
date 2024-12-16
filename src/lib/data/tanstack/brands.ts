import { ProductDTO } from "@medusajs/types"
import { useQuery } from "@tanstack/react-query"
import { StoreBrand } from "types/brand"
import { IPagingParams, IPagingResponse } from "types/paging"
import { sdk } from "@lib/config"

export interface IBrandsResponse extends IPagingResponse {
  brands: StoreBrand[]
}

export interface IBrandProductsResponse extends IPagingResponse {
  products: ProductDTO[]
}

export interface IBrandFormValues {
  name: string
  description?: string
}

export const useBrands = (params?: IPagingParams) => {
  const requestParams = new URLSearchParams(params as any).toString()

  return useQuery<IBrandsResponse>({
    queryFn: () =>
      sdk.client
        .fetch<IBrandsResponse>(`/store/brands`)
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

export const useBrand = (id?: string) => {
  return useQuery<StoreBrand>({
    queryFn: () => fetch(`/api/store/brands/${id}`).then((res) => res.json()),
    queryKey: ["brands", id],
    enabled: !!id,
  })
}

export const useBrandProducts = (id?: string, params?: IPagingParams) => {
  const requestParams = new URLSearchParams(params as any).toString()
  return useQuery<IBrandProductsResponse>({
    queryFn: () =>
      fetch(`/api/store/brands/${id}/products?${requestParams}`).then((res) =>
        res.json()
      ),
    queryKey: ["brands", id, "products", params],
    enabled: !!id,
  })
}
