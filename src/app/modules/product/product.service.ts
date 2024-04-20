import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TProduct } from './product.interfaces';

import Product from './product.model';

// Create a new product into Mongodb Database
const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

// Get all Products from the database
const getAllProductFromDB = async () => {
  const result = await Product.find();
  if (!result.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'Not Found', `No Data Found`, {
      notfound: `There are no data available`,
    });
  }
  return result;
};

// get single Product from the database by id
const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Not Found', `No Data Found`, {
      notfound: `There are no data available`,
    });
  }

  return result;
};

// update single Product using id

const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
  const findingData = await Product.findById(id);
  if (!findingData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Not Found', `No Data Found`, {
      notfound: `There are no data available`,
    });
  }

  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

//delete product from Database by id
const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
