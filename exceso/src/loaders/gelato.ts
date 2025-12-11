import { MedusaContainer } from "@medusajs/medusa/dist/types/global"
import GelatoService from "../services/gelato"

export default async (container: MedusaContainer): Promise<void> => {
  container.register("gelatoService", GelatoService)
} 