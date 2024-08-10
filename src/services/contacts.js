import { Contact } from '../db/models/contacts.js';

export const getAllContactsService = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
  userId,
}) => {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuery = Contact.find();
  contactQuery.where('userId').equals(userId);
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

export const getContactByIdService = (contactId, userId) =>
  Contact.findOne({ _id: contactId, userId });
// Contact.findById(contactId);

export const createContactService = (contactData, userId) =>
  Contact.create(contactData, userId);

export const updateContactByIdService = async (
  contactId,
  contactData,
  userId,
  options = {},
) => {
  const rawResult = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    contactData,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!rawResult || !rawResult.value) return null;

  return {
    student: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContactByIdService = (contactId, userId) =>
  Contact.findOneAndDelete({ _id: contactId, userId });
