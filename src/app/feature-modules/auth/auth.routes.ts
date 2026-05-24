import { Router } from "express";

import { Route } from "../../routes/routes.types.js";
import authServices from "./auth.services.js";
import { body } from "../../../utilities/validate.js";
import { ZUserLogin } from "./auth.types.js";
import { ResponseHandler } from "../../../utilities/response-handler.js";


const router = Router();
router.post("/login", body(ZUserLogin), async (req, res, next) => {
  try {
    console.log("login");
    const { userWithoutPassword,accessToken, refreshToken } = await authServices.login(req.body);
    // const result = await authServices.login(req.body);
    res.cookie('accessToken', accessToken, { maxAge:900000, httpOnly: true })
    res.cookie('refreshToken', refreshToken, { maxAge:7 * 24 * 60 * 60 * 1000, httpOnly: true })

    res.send(new ResponseHandler(userWithoutPassword, null));

  } catch (e) {
  new ResponseHandler(null,e)
  }

});

router.post("/logout", async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = req.cookies;
    await authServices.logout(accessToken, refreshToken);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.send(new ResponseHandler(null, "Logged out successfully"));
  } catch (e) {
  new ResponseHandler(null,e)
  }
});


export default new Route("/auth", router); 