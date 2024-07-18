import Router from "express";
import GetPage from "../Controllers/getAllPagination.js";
import GetByID from "../Controllers/getbyid.js";

const router = Router();

router.get('/page/all',GetPage);
router.get('/id/:id',GetByID);

export default router;