
const mongoose = require('mongoose');

const devSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Name is Required"],
        minlength:[3,"Name must more than 3 characters"],
        trim: true,
    },
    skills: {
        type: [String],
        required: [true," At least one skill is required"],
        validate:{
            validator:function(skills){
                return skills.length>0;
            },
            message:"Skills cannot be empty"
        }
    },
    phoneNumber: {
        type: String,
        required: [true,"Number is required"],
        match: [/^\+?\d{10,15}$/, "Please enter a valid phone number"],

    },
    location: {
        type: String,
        required: [true,"Location is required"],
        trim: true,
        validate:{
            validator: function(value){
                return /^\+?\d{1,10}$/.test(value)
            },
            message:"Location cannot be a Number "
        }
    }
}, { timestamps: true }); 

const Developer = mongoose.model('Developer', devSchema);

module.exports = Developer;






































// const mongoose = require('mongoose');

// const devSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     skills: {
//         type: [String],
//         required: true,
//     },
//     experience: {
//         type: Number,
//         required: true,
//     },
// });

// const Developer = mongoose.model('Developer', devSchema);
// module.exports = Developer;