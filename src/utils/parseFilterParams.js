const parseIsFavourite = (isFavourite) => {
  if (isFavourite === 'true') {
    return true;
  }
  //   if (isFavourite === 'false') {
  //     return false;
  //   }
  return;
};
const parseType = (contactType) => {
  const categories = ['work', 'home', 'personal'];
  if (categories.includes(contactType)) return contactType;
};
//
export const parseFilterParams = (query) => {
  return {
    contactType: parseType(query.contactType),
    isFavourite: parseIsFavourite(query.isFavourite),
  };
};
