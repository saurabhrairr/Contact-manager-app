const mongoose = require("mongoose");


// const contactObjectSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         validate: {
//             validator: (value) => {
//                 if (value) {
//                     return true;
//                 }
//                 return false;
//             },
//             message: (props) => { return `${props.value} contains pattern @#$%&* under username` }
//         }
//     },
//     designation: {
//         type: String,
//         validate: {
//             validator: (value) => {
//                 if (value) {
//                     return true;
//                 }
//                 return false;
//             },
//             message: (props) => { return `${props.value} contains pattern @#$%&* under username` }
//         }
//     },
//     company: {
//         type: String,
//         validate: {
//             validator: (value) => {
//                 if (value) {
//                     return true;
//                 }
//                 return false;
//             },
//             message: (props) => { return `${props.value} contains pattern @#$%&* under username` }
//         }
//     },
//     industry: {
//         type: String,
//         validate: {
//             validator: (value) => {
//                 if (value) {
//                     return true;
//                 }
//                 return false;
//             },
//             message: (props) => { return `${props.value} contains pattern @#$%&* under username` }
//         }
//     },
//     email: {
//         type: String,
//         validate: {
//             validator: (value) => {
//                 if (value) {
//                     return true;
//                 }
//                 return false;
//             },
//             message: (props) => { return `${props.value} contains pattern @#$%&* under username` }
//         }
//     },
//     phoneNo: {
//         type: String,
//         minLength: 10,
//         maxLength: 10,
//         validate: {
//             validator: (value) => {
//                 if (value) {
//                     return true;
//                 }
//                 return false;
//             },
//             message: (props) => { return `${props.value} contains pattern @#$%&* under username` }
//         }

//     },
//     country: {
//         type: String,
//         validate: {
//             validator: (value) => {
//                 if (value !== undefined) {
//                     return true;
//                 }
//                 return false;
//             },
//             message: (props) => { return `${props.value} contains pattern @#$%&* under username` }
//         }
//     }
// });

// const contactObject = mongoose.model("contactObject", contactObjectSchema);

const userContactsSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    contacts: {
        type: Array,
        // of: Object,
         require: true
    }
});

const userContacts = mongoose.model("userContacts", userContactsSchema);

module.exports = userContacts;