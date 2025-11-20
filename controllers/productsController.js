const db = require('../db/models');

const productsController = {
    list: async (req, res, next) => {
        try {
            const products = await db.Product.findAndCountAll();
            const response = {
                message: 'Listado de productos',
                count: products.count,
                data: products.rows,
            };
            res.json(response);
        } catch (error) {
            console.log(error.message);
            res.json({ message: error.message });
        }
    },

    detail: async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await db.Product.findByPk(id);
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ message: `Producto ${id} no encontrado` });
            }
        } catch (error) {
            console.log(error.message);
            res.json({ message: error.message });
        }
    },

    last: async (req, res, next) => {
        try {
            const product = await db.Product.findOne({
                order: [['id', 'DESC']],
                limit: 1,
            });
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ message: 'No hay productos' });
            }
        } catch (error) {
            console.log(error.message);
            res.json({ message: error.message });
        }
    },

    create: async (req, res, next) => {
        try {
            const product = await db.Product.create(req.body);
            res.json(product);
        } catch (error) {
            console.log(error.message);
            res.json({ message: error.message });
        }
    },

    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const [affectedRows] = await db.Product.update(req.body, {
                where: { id },
            });
            if (affectedRows > 0) {
                const updatedProduct = await db.Product.findByPk(id);
                res.json(updatedProduct);
            } else {
                res.status(404).json({ message: `Producto ${id} no encontrado` });
            }
        } catch (error) {
            console.log(error.message);
            res.json({ message: error.message });
        }
    },

    remove: async (req, res, next) => {
        try {
            const { id } = req.params;
            const deletedRows = await db.Product.destroy({
                where: { id },
            });
            if (deletedRows > 0) {
                res.json({ message: `Producto ${id} eliminado` });
            } else {
                res.status(404).json({ message: `Producto ${id} no encontrado` });
            }
        } catch (error) {
            console.log(error.message);
            res.json({ message: error.message });
        }
    },
};

module.exports = productsController;