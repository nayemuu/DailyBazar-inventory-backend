import dotenv from 'dotenv';
dotenv.config();

export const create = async (req, res) => {
  try {
    console.log('req.file = ', req.file);
    res.status(201).json({ message: 'success' });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
