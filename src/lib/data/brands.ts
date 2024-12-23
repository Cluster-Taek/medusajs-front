import { sdk } from "@lib/config"
import { cache } from "react"
import { HttpTypes } from "@medusajs/types"
import { getRegion } from "./regions"
import { StoreBrand } from "types/brand"

export const getBrandsList = cache(async function ({
  pageParam = 1,
  queryParams,
  countryCode,
}: {
  pageParam?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
  countryCode: string
}): Promise<{
  response: { brands: StoreBrand[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
}> {
  const limit = queryParams?.limit || 12
  const offset = pageParam * limit
  const region = await getRegion(countryCode)

  if (!region) {
    return {
      response: { brands: [], count: 0 },
      nextPage: null,
    }
  }

  return sdk.client
    .fetch<{ brands: StoreBrand[]; count: number }>(`/store/brands`)
    .then(({ brands, count }) => {
      const nextPage = count > offset + limit ? pageParam + 1 : null

      return {
        response: {
          brands,
          count,
        },
        nextPage: nextPage,
        queryParams,
      }
    })
})

export const getBrand = cache(async function ({
  brandId,
}: {
  brandId?: string
}): Promise<StoreBrand | null> {
  return brandId
    ? sdk.client.fetch<StoreBrand>(`/store/brands/${brandId}`)
    : null
})
