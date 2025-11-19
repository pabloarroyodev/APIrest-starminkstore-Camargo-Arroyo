module.exports.list = (req, res, next) => {
    res.json({ message: 'Listado de productos (simulado)' });
};

module.exports.detail = (req, res, next) => {
    const { id } = req.params;
    res.json({ message: `Detalle del producto ${id} (simulado)` });
};

module.exports.create = (req, res, next) => {
    res.json({ message: 'Producto creado (simulado)' });
};

module.exports.update = (req, res, next) => {
    const { id } = req.params;
    res.json({ message: `Producto ${id} actualizado (simulado)` });
};

module.exports.remove = (req, res, next) => {
    const { id } = req.params;
    res.json({ message: `Producto ${id} eliminado (simulado)` });
};
