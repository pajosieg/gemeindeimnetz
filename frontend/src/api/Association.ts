import { strapiGet } from './strapiRequest';
import { Association } from '../models/Association';

export const getAllAssociations = () =>
  strapiGet<Association[]>('associations', 'all ssociations').then(associations => {
    associations.sort((a1, a2) => a1.Name.localeCompare(a2.Name));
    return associations;
  });
