import mongoose, { SchemaType } from 'mongoose'

const Schema = mongoose.Schema;

let date = new Date()

export const TodoList = new Schema({
    id: {
        type: String,
    },

    task: {
        type: String,
        required: "Task cannot be empty!"
    },
    
    isCompleted: {
        type: Boolean,
        default: false
    },

    setTime: {
        type: String,
        default: date.toDateString()
    }
});

export const UserLists = new Schema({
    user: {

        useremail: {
            type: String,
            required: "User email is required!"
        },

        username: {
            type: String,
            required: "Username is required!"
        },

        TodoLists: {
            type: Object,
            default: {}
        }
    }
})

export const Users = new Schema({
    useremail: {
        type: String,
        required: "user email is required!"
    },

    id: {
        type: Schema.Types.ObjectId,
        default: Schema.Types.ObjectId
    }
})