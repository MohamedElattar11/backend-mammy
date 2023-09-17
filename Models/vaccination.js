const mongoose = require('mongoose');



const vaccinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: false
  },
  delete_time:
  {
    type: Number,
  }

});

const Vaccination = mongoose.model('Vaccination', vaccinationSchema);

module.exports = Vaccination;
