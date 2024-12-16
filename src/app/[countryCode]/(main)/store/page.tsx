import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Store",
  description: "Explore all of our products.",
}

type Params = {
  searchParams: {
    sortBy?: SortOptions
    brandId?: string
    page?: string
  }
  params: {
    countryCode: string
  }
}

export default async function StorePage({ searchParams, params }: Params) {
  const { sortBy, brandId, page } = searchParams

  return (
    <StoreTemplate
      sortBy={sortBy}
      brandId={brandId}
      page={page}
      countryCode={params.countryCode}
    />
  )
}
