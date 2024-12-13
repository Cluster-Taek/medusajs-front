import { HttpTypes } from "@medusajs/types"
import { StoreBrand } from "./brand"

declare module "@medusajs/types" {
  export namespace HttpTypes {
    export interface StoreProduct
      extends Omit<
        BaseProduct,
        "categories" | "sales_channels" | "variants" | "options" | "collection"
      > {
      /**
       * The product's collection.
       */
      collection?: StoreCollection | null
      /**
       * The product's categories.
       */
      categories?: StoreProductCategory[] | null
      /**
       * The product's variants.
       */
      variants: StoreProductVariant[] | null
      /**
       * The product's types.
       */
      type?: StoreProductType | null
      /**
       * The product's tags.
       */
      tags?: StoreProductTag[] | null
      /**
       * The product's options.
       */
      options: StoreProductOption[] | null
      /**
       * The product's images.
       */
      images: StoreProductImage[] | null

      /**
       * The product's brand.
       */

      brand?: StoreBrand | null
    }
  }
}
