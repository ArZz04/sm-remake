const Product = require('../models/Product');

const allProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products', details: error.message });
    }
};

const getProductFilteredBySubfamily = async (req, res) => {
    const { subfamily_id } = req.params;

    try {
        const products = await Product.find({ subfamily_id });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products', details: error.message });
    }
};

const getProductFilteredByFamily = async (req, res) => {
    const { family_id } = req.params;

    try {
        const products = await Product.find({ family_id });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products', details: error.message });
    }
};

const getProductFilteredByPlu = async (req, res) => {
    const { product_plu } = req.params;

    try {
        const product = await
            Product.findOne({ plu: product_plu });
        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Failed to fetch product', details: error.message });
    }
};

const searchProductByName = async (req, res) => {
    const { product_name } = req.params;

    try {
        const products = await
            Product.find({ name: { $regex: product_name, $options: 'i' } });
        res.json(products);
    }
    catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products', details: error.message });
    }
};

const getRecentProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ last_changed: -1 }).limit(5);
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products', details: error.message });
    }
}

const updateProduct = async (req, res) => {
    const { plu } = req.params;
    const { name, price, format, dots, last_changed } = req.body;

    console.log('Updating product:', plu);

    // Validación de datos
    if ( !name || !price || !format || !dots || !last_changed ) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Verificar si el producto existe
        const product = await Product
            .findOne({ plu });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Actualizar el producto
        product.name = name;
        product.price = price;
        product.format = format;
        product.dots = dots;
        product.last_changed = last_changed;

        // Guardar el producto actualizado
        await product.save();

        // Respuesta exitosa
        res.json({ message: 'Product updated successfully', product });

    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Update failed', details: error.message });
    }
}

const newProduct = async (req, res) => {
    const { plu, name, price, subfamily_id, family_id, format, dots, last_changed, active } = req.body;

    // Validación de datos
    if (!plu || !name || !price || !subfamily_id || !family_id || !format || !dots || !last_changed || active === undefined) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const existingProduct = await Product.findOne({ plu });
        if (existingProduct) {
            return res.status(400).json({ error: 'A product with this PLU already exists' });
        }

        // Creación del nuevo producto
        const product = new Product({ plu, name, price, subfamily_id, family_id, format, dots, last_changed, active });

        // Guardar el producto en la base de datos
        await product.save();

        // Respuesta exitosa
        res.status(201).json({ message: 'Product registered successfully', product });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed', details: error.message });
    }
};

const massiveNewProduct = async (req, res) => {
    const { products } = req.body;

    // Validación de datos
    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: 'Products array is required and cannot be empty' });
    }

    try {
        // Validar cada producto individualmente
        for (const product of products) {
            const { plu, name, price, subfamily_id, family_id, format, dots, last_changed, active } = product;
            if (!plu || !name || !price || !subfamily_id || !family_id || !format || !dots || last_changed === undefined || active === undefined) {
                return res.status(400).json({ error: 'All fields are required for each product' });
            }
        }

        // Obtener los IDs de los productos
        const productPlus = products.map(product => product.plu);

        // Verificar si alguno de los productos ya existe en la base de datos
        const existingProducts = await Product.find({ plu: { $in: productPlus } });
        const existingProductIds = existingProducts.map(product => product.plu);

        // Filtrar los productos que ya existen
        const newProducts = products.filter(product => !existingProductIds.includes(product.plu));
        const omittedProducts = products.filter(product => existingProductIds.includes(product.plu));

        // Insertar los nuevos productos en la base de datos
        if (newProducts.length > 0) {
            await Product.insertMany(newProducts);
        }

        // Respuesta exitosa
        res.status(201).json({
            message: 'Products registered successfully',
            newProducts,
            omittedProducts: omittedProducts.map(product => product.plu)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Registration failed', details: error.message });
    }
};

module.exports = {
    allProducts,
    getProductFilteredBySubfamily,
    getProductFilteredByFamily,
    getProductFilteredByPlu,
    searchProductByName,
    getRecentProducts,
    updateProduct,
    newProduct,
    massiveNewProduct
};
