const express = require('express')
const fs = require('fs-extra')
const path = require('path')
const uuid = require("uuid")
const router = express()

const bookModel = require("../models/books")

const uploadImage = async (file) => {

  let fileName = uuid.v4()
  let filePath = path.resolve(`images/`, fileName + ".png")

  await file.mv(filePath)

  return fileName + ".png"
}

router.get('/', (req, res) => {
  bookModel.getAllBook().then((result) => {
    res.send({
      status: "SUCCESS",
      msg: "Get success.",
      result: result
    })
  }).catch((error) => {
    res.send({
      status: "ERROR",
      msg: "Can't get book.",
      result: error
    })
  })
})

router.post('/', async (req, res) => {

  let upload = await uploadImage(req.files.image)

  let model = {
    title: req.body.title,
    description: req.body.description,
    image: `http://localhost:3000/images/${upload}`,
    price: req.body.price ? Number(req.body.price) : 0,
  }

  bookModel.insertBook(model).then((result) => {
    res.send({
      status: "SUCCESS",
      msg: "Created success."
    })
  }).catch((error) => {
    res.send({
      status: "ERROR",
      msg: "Can't create book.",
      result: error?.errors
    })
  })
})

router.put('/:id', (req, res) => {

  bookModel.getBookById(req.params.id).then(async (book) => {

    if (req?.files?.image) {
      let imgName = (book.image).replace("http://localhost:3000/images/", "")
      let filePath = path.resolve(`images/`, imgName)
      await (req.files.image).mv(filePath)
    }

    let model = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price ? Number(req.body.price) : 0,
    }

    bookModel.updateBookById(req.params.id, model).then((result) => {
      res.send({
        status: "SUCCESS",
        msg: "Updated success."
      })
    }).catch((error) => {
      res.send({
        status: "ERROR",
        msg: "Can't update book.",
        result: error
      })
    })
  }).catch((error) => {
    res.send({
      status: "ERROR",
      msg: "Not found book.",
      result: error
    })
  })
})

router.delete('/:id', (req, res) => {

  bookModel.getBookById(req.params.id).then((book) => {
    let imgPathRm = book.image.replace("http://localhost:3000/images/", "")
    let filePath = path.resolve(`images/${imgPathRm}`)

    fs.remove(filePath)

    bookModel.deleteBookById(req.params.id).then((result) => {
      res.send({
        status: "SUCCESS",
        msg: "Deleted success.",
        result: result
      })
    }).catch((error) => {
      res.send({
        status: "ERROR",
        msg: "Can't delete book.",
        result: error
      })
    })
  }).catch((error) => {
    res.send({
      status: "ERROR",
      msg: "Not found book.",
      result: error
    })
  })

})


module.exports = router