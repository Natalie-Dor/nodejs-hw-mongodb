import { Contact } from '../db/models/contacts.js';

export const getAllContactsService = () => Contact.find();

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
