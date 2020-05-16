import mongoose from 'mongoose'

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