import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductServices } from './product.service';

const createProductIntoDB = catchAsync(async (req, res) => {
  const result = await ProductServices.createProductIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Product created successfully',
    data: result,
  });
});

const getAllProductFromDB = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'All Products are Retrieved successfully',
    data: result,
  });
});

const getSingleProductFromDB = catchAsync(async (req, res) => {
  const result = await ProductServices.getSingleProductFromDB(
    req.params.productId,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Product Retrieved successfully',
    data: result,
  });
});

const updateProductIntoDB = catchAsync(async (req, res) => {
  const result = await ProductServices.updateProductIntoDB(
    req.params.productId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Service update successfully',
    data: result,
  });
});
const deleteProductFromDB = catchAsync(async (req, res) => {
  const result = await ProductServices.deleteProductFromDB(
    req.params.productId,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Service Deleted successfully',
    data: result,
  });
});

export const ProductControllers = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
