"use client"

import { useBrands } from "@lib/data/tanstack/brands"
import FilterRadioGroup from "@modules/common/components/filter-radio-group"

type FilterProductsProps = {
  brandId?: string
  setQueryParams: (name: string, value: string) => void
  "data-testid"?: string
}

const FilterProducts = ({
  "data-testid": dataTestId,
  brandId,
  setQueryParams,
}: FilterProductsProps) => {
  const handleChange = (value: string) => {
    setQueryParams("brandId", value)
  }

  const { data: brandsResponse } = useBrands()

  return (
    <FilterRadioGroup
      title="Brand"
      items={
        brandsResponse?.brands?.map((brand) => ({
          value: brand.id,
          label: brand.name,
        })) || []
      }
      value={brandId}
      handleChange={handleChange}
      data-testid={dataTestId}
    />
  )
}

export default FilterProducts
