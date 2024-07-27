import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
  createContactController,
  deleteContactByIdController,
  getAllContactsController,
  getContactByIdController,
  updateContactByIdController,
} from '../controllers/contacts.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getAllContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
router.post('/contacts', jsonParser, ctrlWrapper(createContactController));
router.patch(
  '/contacts/:contactId',
  jsonParser,
  ctrlWrapper(updateContactByIdController),
);
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactByIdController));
export default router;
// upsert
// name - обов’язково
// phoneNumber - обов’язково
// email - не обовʼязково
// isFavourite - не обовʼязково
// contactType - обовʼязково
