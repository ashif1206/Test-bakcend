import mongoose, { model, Schema } from 'mongoose'

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, "Name must be at least 2 characters long"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email address",
    },
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v);
      },
      message: "Phone number must be 10 digits",
    },
  },
});


const contactModel =  model("contact",contactSchema);

export default contactModel;