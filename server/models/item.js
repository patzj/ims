import mongoose from 'mongoose';
import Hashids from 'hashids';

const schema = mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        default: () => (new Hashids).encode(Date.now()),
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: Array
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
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

schema.methods.itemIn = function(n) {
    if(isNaN(n) || parseInt(n) < 0) {
        throw 'Invalid input';
    }

    this.quantity += n;
};

schema.methods.itemOut = function(n) {
    if(isNaN(n) || parseInt(n) < 0 || parseInt(n) > this.quantity) {
        throw 'Invalid input';
    }

    this.quantity -= n;
};

export const Item = mongoose.model('Item', schema);
export default Item;
