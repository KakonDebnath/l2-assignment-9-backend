type Review = {
  reviewer: string;
  comment: string;
  rating: number;
  reviewDate: Date;
};

export type TProduct = {
  name: string;
  description: string;
  price: number;
  categories: string[];
  stockQuantity: number;
  images: string;
  brand: string;
  ratings: number;
  reviews: Review[];
  isActive?: boolean;
  isDeleted?: boolean;
};
