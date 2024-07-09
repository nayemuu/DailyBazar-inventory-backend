import express from 'express';
import { checkLogin } from '../middlewares/common/checkLogin';
import { create } from '../controllers/locationController';

const Route = express.Router();
Route.post('/', checkLogin, upload.single('logo'), create);

export default Route;
