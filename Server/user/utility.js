const userInfo = require("./modals/user-modal")
const userContacts = require("./modals/contacts-modal")

const checkExistingUser = async (username) => {
       let existingUser = false;
       await userInfo.find({ username: username }).then((userData) => {
              if (userData.length) {
                     existingUser = true;

              }
       });
       return existingUser;
}

const contactSchemaCustom = [
       "name",
       "designation",
       "company",
       "industry",
       "email",
       "phoneNo",
       "country"
]

// let obj ={
//     name: "saurabh",
//     designation: "student",
//     company: "10x academy",
//     industry: "logistic",
//     email: "saurabh@testcom",
//     phoneNo: "1234567890",
//     country:"India"
// };
const ContactsValidator = (contact) => {
       let isValid = true;
       if (contact.length) {
              for (let i = 0; i < contactSchemaCustom.length; i++) {
                     if (!contact[j][contactSchemaCustom[i]]) {
                            isValid = false;
                            return isValid;
                            // break;
                     }
              }
              if (contact.phoneNo.length !== 10 && (parseInt(contact.phoneNo)).toString().length !== 10) {
                     isValid = false;
              }
              if (!contact.email.includes("@") || !contact.email.split("@")[1].includes(".")) {
                     isValid = false;
              }

       }
       return isValid
};

const CheckforDuplicates = (allcontacts, sample) => {
       let isPresent = false;
       for (let i = 0; i < allcontacts.length; i++) {
              if (allcontacts[i].email === sample.email || allcontacts[i].phoneNo === sample.phoneNo) {
                     isPresent = true;
                     break;
              }
       }
       return isPresent;
}

module.exports = { ContactsValidator, checkExistingUser, CheckforDuplicates };
// module.exports = checkExistingUser;


