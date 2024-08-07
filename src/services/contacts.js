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
  const [countContacts, contacts] = await Promise.all([
    Contact.find().merge(contactQuery).countDocuments(),
    contactQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .exec(),
  ]);
  if (filter.isFavourite) {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }
  if (filter.contactType) {
    contactQuery.where('contactType').equals(filter.contactType);
  }

  const totalPages = Math.ceil(countContacts / perPage);
  return {
    contacts,
    page,
    perPage,
    totalItems: countContacts,
    totalPages,
    hasNextPage: totalPages - page > 0,
    hasPreviousPage: page > 1,
  };
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
