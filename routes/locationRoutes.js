import express from 'express';
import { checkLogin } from '../middlewares/common/checkLogin.js';
import { create } from '../controllers/locationController.js';
import { upload } from '../utils/multer.js';

const Route = express.Router();
Route.post('/', checkLogin, upload.single('logo'), create);

export default Route;
