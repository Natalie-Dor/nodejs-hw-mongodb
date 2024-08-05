import { Contact } from '../db/models/contacts.js';

export const getAllContactsService = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
}) => {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuery = Contact.find();

  if (filter.isFavourite) {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }
  if (filter.contactType) {
    contactQuery.where('contactType').equals(filter.contactType);
  }

  const [contacts, count] = await Promise.all([
    contactQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .exec(),
    Contact.countDocuments(contactQuery),
  ]);

  // const [contacts, count] = await Promise.all([
  //   Contact.find()
  //     .sort({ [sortBy]: sortOrder })
  //     .skip(skip)
  //     .limit(limit)
  //     .exec(),
  //   Contact.countDocuments(),
  // ]);
  // const contacts = await Contact.find().skip(skip).limit(limit).exec();
  // const count = await Contact.countDocuments();
  const totalPages = Math.ceil(count / perPage);
  return {
    contacts,
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasNextPage: totalPages - page > 0,
    hasPreviousPage: page > 1,
  };
  return Contact.find().merge(contactQuery).exec();
};

export const getContactByIdService = (contactId) => Contact.findById(contactId);

export const createContactService = (contactData) =>
  Contact.create(contactData);

export const updateContactByIdService = async (
  contactId,
  contactData,
  options = {},
) => {
  const rawResult = await Contact.findByIdAndUpdate(contactId, contactData, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });
  if (!rawResult || !rawResult.value) return null;

  return {
    student: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContactByIdService = (contactId) =>
  Contact.findByIdAndDelete(contactId);
