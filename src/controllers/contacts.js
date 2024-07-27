import createHttpError from 'http-errors';
import {
  createContactService,
  deleteContactByIdService,
  getAllContactsService,
  getContactByIdService,
  updateContactByIdService,
} from '../services/contacts.js';
export const getAllContactsController = async (req, res, next) => {
  const contacts = await getAllContactsService();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};
export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactByIdService(contactId);
  if (contact === null) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};
export const createContactController = async (req, res, next) => {
  const newContact = await createContactService(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const updateContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await updateContactByIdService(contactId, req.body);
  if (updatedContact === null) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: updatedContact,
  });
};
export const deleteContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const removedContact = await deleteContactByIdService(contactId);
  if (removedContact === null) {
    return next(createHttpError(404, 'Contact not found'));
  }
  res.sendStatus(204);
};

// post- const { name, phoneNumber, email, isFavourite, contactType } = req.body;
