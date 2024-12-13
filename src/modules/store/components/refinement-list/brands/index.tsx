"use client"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"

export type FilterOptions = "price_asc" | "price_desc" | "created_at"

type BrandsFilterProps = {
  sortBy: FilterOptions
  setQueryParams: (name: string, value: FilterOptions) => void
  "data-testid"?: string
}

const filterOptions = [
  {
    value: "created_at",
    label: "Latest Arrivals",
  },
  {
    value: "price_asc",
    label: "Price: Low -> High",
  },
  {
    value: "price_desc",
    label: "Price: High -> Low",
  },
]

const BrandsFilter = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
}: BrandsFilterProps) => {
  const handleChange = (value: FilterOptions) => {
    setQueryParams("sortBy", value)
  }

  return (
    <FilterRadioGroup
      title="Brands"
      items={filterOptions}
      value={sortBy}
      handleChange={handleChange}
      data-testid={dataTestId}
    />
  )
}

export default BrandsFilter
