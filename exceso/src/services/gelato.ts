import { TransactionBaseService } from "@medusajs/medusa"
import { ProductService } from "@medusajs/medusa"
import axios from "axios"

type GelatoProduct = {
  id: string
  name: string
  description?: string
  price: number
  currency: string
  images: string[]
  variants: {
    id: string
    name: string
    price: number
    options: {
      name: string
      value: string
    }[]
  }[]
}

class GelatoService extends TransactionBaseService {
  protected readonly productService_: ProductService
  private readonly apiKey: string
  private readonly baseUrl: string = "https://order.gelatoapis.com"

  constructor(container) {
    super(container)
    this.productService_ = container.productService
    this.apiKey = process.env.GELATO_API_KEY
  }

  async fetchProducts(): Promise<GelatoProduct[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/v4/products`, {
        headers: {
          "X-API-KEY": this.apiKey,
        },
      })
      return response.data
    } catch (error) {
      console.error("Error fetching Gelato products:", error)
      throw error
    }
  }

  async importProducts(): Promise<void> {
    const gelatoProducts = await this.fetchProducts()
    
    for (const gelatoProduct of gelatoProducts) {
      await this.createOrUpdateProduct(gelatoProduct)
    }
  }

  private async createOrUpdateProduct(gelatoProduct: GelatoProduct): Promise<void> {
    const productData = {
      title: gelatoProduct.name,
      description: gelatoProduct.description || "",
      handle: gelatoProduct.name.toLowerCase().replace(/\s+/g, "-"),
      is_giftcard: false,
      discountable: true,
      status: "published",
      thumbnail: gelatoProduct.images[0],
      images: gelatoProduct.images.map((url) => ({ url })),
      options: [
        {
          title: "Size",
        },
      ],
      variants: gelatoProduct.variants.map((variant) => ({
        title: variant.name,
        prices: [
          {
            amount: Math.round(variant.price * 100), // Convert to cents
            currency_code: variant.currency || "USD",
          },
        ],
        options: [
          {
            value: variant.options.find((opt) => opt.name === "Size")?.value || "Default",
          },
        ],
      })),
    }

    try {
      await this.productService_.create(productData)
    } catch (error) {
      console.error(`Error creating product ${gelatoProduct.name}:`, error)
    }
  }
}

export default GelatoService 