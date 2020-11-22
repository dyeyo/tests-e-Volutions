module.exports = (sequelize, type) => {
  const Users = sequelize.define(
    'user',
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      'name': type.STRING,
      'email': type.STRING,
      'password': type.STRING(150)
    })
  return Users;
  // Test.hasMany(models.Question, {
  //   foreignKey: 'userId',
  // });
}
