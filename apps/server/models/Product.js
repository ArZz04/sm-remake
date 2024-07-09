const mongoose = require('mongoose');

//id, name, price, family_id, format, dots, last_changed, active
const productSchema = new mongoose.Schema({
    plu: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    subfamily_id: { type: String, required: true },
    family_id: { type: String, required: true },
    format: { type: String, required: true },
    dots: { type: Number, required: true },
    last_changed: { type: Date, required: true },
    active: { type: Boolean, required: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;