module.exports = function (sequelize, DataTypes) {
  const StudentApprovedPickup = sequelize.define('StudentApprovedPickup', {
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'students',
        key: 'id'
      }
    },
    approvedPickupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'approveds',
        key: 'id'
      }
    }
  });
  return StudentApprovedPickup;
};
