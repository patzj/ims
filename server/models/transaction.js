import mongoose from 'mongoose';
import Hashids from 'hashids';

const schema = mongoose.Schema({
    transactionId: {
        type: String,
        required: true,
        unique: true,
        default: () => (new Hashids('', 12)).encode(Date.now())
    },
    transactionType: {
        type: String,
        required: true,
        enum: ['ITEM IN', 'ITEM OUT', 'ITEM ADJUST']
    },
    itemCode: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    transactionDate: {
        type: Date,
        required: true,
        default: () => Date.now()
    }
});

export const Transaction = mongoose.model('Transaction', schema);
export default Transaction;
