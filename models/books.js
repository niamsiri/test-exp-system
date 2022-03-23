const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const collection = new Schema({
    title: {
        type: String,
        required: [true, 'title required'],
    },
    description: {
        type: String,
        default: ""
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, 'price required'],
        min: [0, 'Minimun quantity is zero']
    },
}, { timestamps: true });

const bookCollection = mongoose.model("books", collection);

const getBookById = async (id) => {
    return await bookCollection.findById(id)
}

const getAllBook = async (query) => {
    return await bookCollection.find(query)
}

const insertBook = async (data) => {
    return await bookCollection.create(data);
}

const updateBookById = async (id, data) => {
    return await bookCollection.findOneAndUpdate({ _id: id }, data)
}

const deleteBookById = async (id) => {
    return await bookCollection.deleteOne({ _id: id });
}

module.exports = {
    getBookById,
    getAllBook,
    insertBook,
    updateBookById,
    deleteBookById
}