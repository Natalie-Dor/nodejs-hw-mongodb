import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
  createContactController,
  deleteContactByIdController,
  getAllContactsController,
  getContactByIdController,
  updateContactByIdController,
} from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidID.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getAllContactsController));
router.get('/contacts/:id', isValidId, ctrlWrapper(getContactByIdController));
router.post(
  '/contacts',
  jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
router.patch(
  '/contacts/:id',
  isValidId,
  jsonParser,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactByIdController),
);
router.delete(
  '/contacts/:id',
  isValidId,
  ctrlWrapper(deleteContactByIdController),
);
export default router;
// upsert
// name - обов’язково
// phoneNumber - обов’язково
// email - не обовʼязково
// isFavourite - не обовʼязково
// contactType - обовʼязково
