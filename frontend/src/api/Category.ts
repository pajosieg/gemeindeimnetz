import { strapiGet } from './strapiRequest';
import { Category } from '../models/Category';

export const getAllCategories = (): Promise<Category[]> =>
  strapiGet('categories', 'all categories');
