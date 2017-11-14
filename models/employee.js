const mongoose = require('mongoose');


//Employee schema.
const EmployeeSchema = mongoose.Schema({
  name: {
    type: String,
  },
  lastname: {
    type: String,
  },
  address: {
      type: String,
  },
  whatsapp: {
      type: String,
  }
});

let Employee = module.exports = mongoose.model('Employee', EmployeeSchema);
