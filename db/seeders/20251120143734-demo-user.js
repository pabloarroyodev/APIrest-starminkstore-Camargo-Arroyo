'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Agrega comandos de siembra aquí.
     */
    await queryInterface.bulkInsert('products', [
      {
        name: 'Álbum "Map of the Soul: 7"',
        description: 'Álbum de estudio de BTS. Incluye photocard aleatoria y póster.',
        price: 35000, // Precio en centavos o unidad de moneda
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lightstick Oficial (Blink Bong)',
        description: 'Lightstick oficial de BLACKPINK (Versión 2). Conexión Bluetooth para conciertos.',
        price: 50000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hoodie Stray Kids "Maniac"',
        description: 'Sudadera negra con logo del tour "Maniac" de Stray Kids.',
        price: 45000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Photocard Pack ITZY "Cheshire"',
        description: 'Set de photocards del mini álbum "Cheshire" del grupo ITZY.',
        price: 15000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Calendario de Pared (TWICE)',
        description: 'Calendario 2024 con fotos exclusivas del grupo femenino TWICE.',
        price: 20000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Agrega comandos para revertir la siembra aquí.
     */
    // Para deshacer la inserción, borramos todos los registros de la tabla products
    await queryInterface.bulkDelete('products', null, {});
  }
};