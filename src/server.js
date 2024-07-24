import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getAllContacts, getContactById } from './services/contacts.js';

export function setupServer() {
  const PORT = process.env.PORT || 3000;

  const app = express();

  app.use(pino());
  app.use(cors());

  //   app.get('/', (req, res) => {
  //     res.json({
  //       message: 'Hello world!',
  //     });
  //   });
  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();
      //   res.send(contacts);
      res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const { contactId } = req.params;
      const contact = await getContactById(contactId);
      if (contact === null) {
        return res
          .status(404)
          .send({ status: 404, message: 'Contact not found' });
      }

      res.status(200).json({
        status: 200,
        message: 'Successfully found contact with id {**contactId**}!',
        data: { contact },
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  // ==============================================

  app.use('*', (req, res, next) => {
    res.status(404).send({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
}
