import { Router } from 'express';
import { ProductControllers } from './product.controller';

const router = Router();
router.post('/', ProductControllers.createProductIntoDB);
router.get('/', ProductControllers.getAllProductFromDB);
router.get('/:productId', ProductControllers.getSingleProductFromDB);
router.patch('/:productId', ProductControllers.updateProductIntoDB);
router.delete('/:productId', ProductControllers.deleteProductFromDB);

export const ProductRoutes = router;
