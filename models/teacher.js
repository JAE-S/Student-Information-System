module.exports = function (sequelize, DataTypes) {
  const Teacher = sequelize.define('Teacher', {
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
    employeeId: {
      type: DataTypes.INTEGER
    },
    roomNumber: {
      type: DataTypes.INTEGER
    },
    email: {
      type: DataTypes.STRING
    },
    phoneNumber: {
      type: DataTypes.STRING
    },
    streetAddress: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    zipcode: {
      type: DataTypes.INTEGER
    }
  });

  Teacher.associate = function (models) {
    // Associating Teachers with Students
    Teacher.hasMany(models.Student, {
      foreignKey: {
        name: 'TeacherId',
        allowNull: true
      }
    });
  };

  return Teacher;
};
