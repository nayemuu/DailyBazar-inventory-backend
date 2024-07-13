// import dotenv from 'dotenv';
// dotenv.config();
import fs from 'fs';
import slugify from 'slugify';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { imageUploadOnDB } from '../utils/image.js';
import { locationModel } from '../models/locationModel.js';

export const create = async (req, res) => {
  try {
    // console.log('req.file = ', req.file);
    const { name } = req.body;
    console.log('req.body = ', req.body);

    if (!name && !name?.trim().length) {
      return res.status(400).json({ message: 'name is required' });
    }

    const isUserExists = await locationModel.findOne({
      slug: slugify(name.trim()),
    });
    if (isUserExists) {
      return res
        .status(400)
        .json({ message: 'location with this name already exist' });
    }

    res.status(201).json({ message: 'Location created successfully' });

    if (req.file) {
      const logo = await uploadOnCloudinary(req.file.path);
      imageUploadOnDB({ ...logo });
      locationModel.create({
        name,
        slug: slugify(name),
        logo: logo.secure_url,
      });
    } else {
      locationModel.create({ name, slug: slugify(name.trim()) });
    }
  } catch (error) {
    console.log(error);
  } finally {
    fs.unlink(req.file.path, (error) => {
      if (error) {
        console.log('uploadOnCloudinary, fsmodule error = ', error);
      }
    });
  }
};
