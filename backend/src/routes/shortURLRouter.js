import { Router } from "express";
import { generateShortUrl, redirectUrl } from "../controllers/shortUrlController.js";
import { loggedInUser } from "../middlewares/authMiddleware.js";

const shortURLRouter = Router();



shortURLRouter.post("", loggedInUser ,generateShortUrl)
shortURLRouter.get("/:shorturl", redirectUrl);



export default shortURLRouter;