module.exports = (sequelize, Sequelize) => {
  const Motorbike = sequelize.define("motorbike", {
    brand: {
      type: Sequelize.STRING
    },
    model: {
      type: Sequelize.STRING
    },
  });

  Motorbike.associate = function(models) {
    Motorbike.belongsTo(models.user, {
      onDelete: "CASCADE",
      foreignKey: "userId",
      as: "users",
    })
  }

  return Motorbike;
};