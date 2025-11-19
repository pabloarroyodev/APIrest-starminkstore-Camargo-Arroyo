const productsController = {
    list: (req, res, next) => {
        res.json({ message: 'Listado de productos (simulado)' });
    },

    detail: (req, res, next) => {
        const { id } = req.params;
        res.json({ message: `Detalle del producto ${id} (simulado)` });
    },

    last: (req, res, next) => {
        res.json({ message: 'Último producto agregado (simulado)' });
    },

    create: (req, res, next) => {
        res.json({ message: 'Producto creado (simulado)' });
    },

    update: (req, res, next) => {
        const { id } = req.params;
        res.json({ message: `Producto ${id} actualizado (simulado)` });
    },

    remove: (req, res, next) => {
        const { id } = req.params;
        res.json({ message: `Producto ${id} eliminado (simulado)` });
    },
};

module.exports = productsController;