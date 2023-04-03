import { Router } from "express";
import { logger } from "../middlewares/loggers.middleware.js";
import { auth } from "../middlewares/middlewares.js";
import productController from "../controllers/products.controller.js";

const router = Router();

router
  .get("/", logger, productController.getAll)
  .get("/:id", logger, productController.getById)
  .post("/", logger, auth, productController.create)
  .put("/:id", logger, auth, productController.updateById)
  .delete("/:id", logger, auth, productController.deleteById);

export default router;
