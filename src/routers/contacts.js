import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
  // changeContactPhotoController,
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
import { upload } from '../middlewares/multer.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/contacts', auth, ctrlWrapper(getAllContactsController));
router.get(
  '/contacts/:id',
  auth,
  isValidId,
  ctrlWrapper(getContactByIdController),
);

router.delete(
  '/contacts/:id',
  auth,
  isValidId,
  ctrlWrapper(deleteContactByIdController),
);
// =============================================

router.post(
  '/contacts',
  auth,
  upload.single('photo'),
  jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/contacts/:id',
  auth,
  upload.single('photo'),
  isValidId,
  jsonParser,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactByIdController),
);
// =============================================
// Розширте функціонал можливістю завантажувати фотографії для роутів:
// POST /contacts
// PATCH /contacts/:contactId
// Додайте підтримку Content-Type: multipart/formdata для цих ендпоінтів.
// Додайте поле photo типу String в моделі Contact.
// Додайте завантаження файлів на cloudinary. Посилання на файл фото запишіть в базу у поле photo. Переконайтеся, що в усіх ендпоінтах, де є робота з контактами, присутня можливість отримати посилання на фото.

// ======================
// router.post(
//   '/contacts/photo',
//   auth,
//   upload.single('photo'),

//   // jsonParser,
//   // validateBody(updateContactSchema),
//   ctrlWrapper(changeContactPhotoController),
// );

export default router;
