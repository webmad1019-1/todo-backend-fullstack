const mongoose = require('mongoose');
const Task = require("../models/Task");

mongoose
  .connect('mongodb://localhost/todobackend', { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)

    Task
      .collection
      .drop()
      .then(() => {
        Task
          .create(Array(5).fill().map((x, idx) => ({
            description: `Lorem Ipsum ${idx + 1}`,
            timestamp: new Date()
          })))
          .then(allElementsCreated => {
            console.log(`Your ${allElementsCreated.length} tasks have been created`)
            process.exit(0)
          })
      })

  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });