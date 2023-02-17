const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "genre",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(100),
      },
    },
    { timestamps: false }
  );
};
