import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        enum: ['SYSTEM ADMIN', 'INVENTORY MGR'],
        default: 'INVENTORY MGR'
    },
    created: {
        type: Date,
        default: Date.now()
    },
    modified: {
        type: Date,
        default: null
    }
});

schema.statics.generateHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

schema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

export const User = mongoose.model('User', schema);
export default User;
