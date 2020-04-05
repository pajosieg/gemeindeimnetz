import { strapiGet } from './strapiRequest'
import { Association } from '../models/Association'
export const getAssociation = () => {}
export const getAllAssociations = () => strapiGet<Association[]>('associations')
