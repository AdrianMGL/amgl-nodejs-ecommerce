const { db, DataTypes } = require("../utils/database.util");

/**
 *
 */
const Category = db.define("category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "active", // active | cancelled | completed
    allowNull: false,
  },
});

//
module.exports = { Category };
