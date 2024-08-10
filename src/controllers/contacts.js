import createHttpError from 'http-errors';
import {
  createContactService,
  deleteContactByIdService,
  getAllContactsService,
  getContactByIdService,
  updateContactByIdService,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContactsService({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};
export const getContactByIdController = async (req, res, next) => {
  const { id } = req.params;
  const contact = await getContactByIdService(id, req.user._id);
  if (contact === null) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contact,
  });
};
export const createContactController = async (req, res, next) => {
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
    userId: req.user._id,
  };
  const newContact = await createContactService(contact);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const updateContactByIdController = async (req, res, next) => {
  const { id } = req.params;
  const updatedContact = await updateContactByIdService(
    id,
    req.body,
    req.user._id,
  );
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
  const { id } = req.params;
  const removedContact = await deleteContactByIdService(id, req.user._id);
  if (removedContact === null) {
    return next(createHttpError(404, 'Contact not found'));
  }
  res.sendStatus(204);
};

// post- const { name, phoneNumber, email, isFavourite, contactType } = req.body;
