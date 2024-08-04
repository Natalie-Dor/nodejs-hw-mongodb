// export { parseFilterParams };
// export const createContactFilter = (query) => {
//   const { type, isFavourite } = query;
//   const filter = {};

//   if (type) {
//     filter.contactType = type;
//   }

//   if (isFavourite) {
//     filter.isFavourite = isFavourite === 'true';
//   }

//   return filter;
// };

const parseIsFavourite = (isFavourite) => {
  if (isFavourite === 'true') {
    return true;
  }
  if (isFavourite === 'false') {
    return false;
  }
  return undefined;
};
const parseType = (contactType) => {
  const categories = ['work', 'home', 'personal'];
  if (categories.includes(contactType)) return contactType;
};
export const parseFilterParams = (query) => {
  return {
    contactType: parseType(query.contactType),
    isFavourite: parseIsFavourite(query.isFavourite),
  };
};
