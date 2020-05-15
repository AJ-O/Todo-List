import mongoose from 'mongoose'

const Schema = mongoose.Schema;

export const testSchema = new Schema({
    name: {
        type: String,
        required: "Enter a name",
    },

    password: {
        type: String,
        required: "Password required"
    }
});
//const url = "mongodb+srv://ash2:jain@cluster0-lj2nn.mongodb.net/test?retryWrites=true&w=majority";
//
// mongoose.connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//     })
//     .then(()=> {
//         console.log("connected!")
//         const db = mongoose.connection
//     })
//     .catch((err: Error): void => {
//     console.log(err.message)
// })