const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: [true, "email is required"],
            validate:{
                validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: "please enter a valid email"
            }
        },
        password:{
            type: String,
            required: [true, "password is required"],
            minlength: [8, "passwrod must be at least 8 characters long"]
        },
        defaultView:{
            type: Boolean,
            default: false
        }
    },{timestamps: true}
);

UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set((value) => {
        this._confirmPassword = value;
    })

    UserSchema.pre("validate", function (next){
        if(this.password !== this.confirmPassword){
            this.invalidate("confirmPassword", "passwords must match")
        }
        next();
    })

UserSchema.pre("save", function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(err => {
            console.log("error saving hash")
            console.log(err)
        })

})
module.exports = mongoose.model("User", UserSchema);