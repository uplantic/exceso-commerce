import { Command } from "@medusajs/medusa-cli"
import { MedusaContainer } from "@medusajs/medusa/dist/types/global"
import GelatoService from "../services/gelato"

export default class GelatoImportCommand extends Command {
  static description = "Import products from Gelato"

  async run() {
    const container = this.container as MedusaContainer
    const gelatoService = container.resolve("gelatoService") as GelatoService

    try {
      console.log("Starting Gelato product import...")
      await gelatoService.importProducts()
      console.log("Gelato product import completed successfully!")
    } catch (error) {
      console.error("Error during Gelato product import:", error)
      process.exit(1)
    }
  }
} 