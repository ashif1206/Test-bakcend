import express from 'express'
import { createContact, deleteContact, getAllContacts, getSingleContact } from '../controller/contactController.js';

const contactRoute = express.Router();

contactRoute.route("/contacts").post(createContact).get(getAllContacts)
contactRoute.route("/contact").get(getSingleContact).delete(deleteContact)


export default contactRoute;