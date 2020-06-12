import mongoose, { SchemaType } from 'mongoose'

const Schema = mongoose.Schema;

export const UserLists = new Schema({

    useremail: {
        type: String,
        required: "Username is required!"
    },

    TodoLists: {
        type: Object,
        default: {}
    }
});