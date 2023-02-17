const { DataTypes, Sequelize, STRING, ENUM } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "videogame",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      released: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
      rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
      },
      platforms: {
        type: DataTypes.ARRAY(
          ENUM(
            "Xbox",
            "PlayStation",
            "PC",
            "macOS",
            "Apple Macintosh",
            "Nintendo"
          )
        ),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
