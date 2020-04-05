export type Community = {
  id: number;
  Name: string;
  Association: string;
  AssociationId: number;
  ZipCode: number;
};

export const createEmptyCommunity = (
  name: string,
  zip: number,
  association: number
): Community => ({
  id: -1,
  Name: name,
  Association: '-1',
  AssociationId: association,
  ZipCode: zip,
});
