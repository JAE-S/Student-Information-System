module.exports = function (sequelize, DataTypes) {
  const Parent = sequelize.define('Parent', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false

    },
    custodyRelation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    livingWith: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    employer: {
      type: DataTypes.STRING
    },
    streetAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zipcode: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Parent.associate = function (models) {
    Parent.hasMany(models.Student);
  };
  return Parent;
};
