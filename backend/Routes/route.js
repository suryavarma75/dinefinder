import { Router } from "express";
import getRoutes from './getroutes.js';

const router = Router();

router.use('/get',getRoutes);


export default router;
