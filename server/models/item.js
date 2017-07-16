import mongoose from 'mongoose';

const schema = mongoose.Schema({
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
    slug: {
        type: String,
        required: true,
        unique: true
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

schema.methods.generateSlug = function() {
    this.slug = this.name.trim().toLowerCase().split(' ').join('-');
};

export const Item = mongoose.model('Item', schema);
export default Item;
