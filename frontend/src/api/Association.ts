import { strapiGet } from './strapiRequest';
import { Association } from '../models/Association';

export const getAllAssociations = () =>
  strapiGet<Association[]>('associations', 'all ssociations');
