const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

router

  .get('/', (req, res, next) => {

    Employee.find({}, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });

  })

  .get('/:id', (req, res) => {

    Employee.findById(req.params.id, (err, employee) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(employee);
      }
    });

  })

  .post('/', (req, res, next) => {

    let employee = new Employee();

    employee.name = req.body.name;
    employee.lastname = req.body.lastname;
    employee.address = req.body.address;
    employee.whatsapp = req.body.whatsapp;

    employee.save((err) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({ msg: "All good on post" });
    });
  })

  .put('/:id', (req, res, next) => {
    const employee = {
      name: req.body.name,
      lastname: req.body.lastname,
      address: req.body.address,
      whatsapp: req.body.whatsapp
    }

    let query = { _id: req.params.id }

    Employee.update(query, employee, err => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({ msg: "All good on put" });
    });
  })

  .delete('/:id', (req, res, next) => {
    console.log("On delete");
    let query = { _id: req.params.id };

    Employee.findById(req.params.id, (err, employee) => {

        Employee.remove(query, err => {

          if (err) return res.status(500).json(err);
          return res.status(200).json({ msg: "All good on delete" });
        });
    });


  });

module.exports = router;