import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
  createContactController,
  deleteContactByIdController,
  getAllContactsController,
  getContactByIdController,
  updateContactByIdController,
} from '../controllers/contacts.js';

import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { auth } from '../middlewares/authenticate.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/contacts', auth, ctrlWrapper(getAllContactsController));
router.get(
  '/contacts/:id',
  auth,
  isValidId,
  ctrlWrapper(getContactByIdController),
);
router.post(
  '/contacts',
  auth,
  jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
router.patch(
  '/contacts/:id',
  auth,
  isValidId,
  jsonParser,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactByIdController),
);
router.delete(
  '/contacts/:id',
  auth,
  isValidId,
  ctrlWrapper(deleteContactByIdController),
);
export default router;
