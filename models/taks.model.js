module.exports = (sequelize, type) => {
  const Task = sequelize.define(
    'task',
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      'name': type.STRING,
      'priority': type.STRING,
      'expirationDate': type.DATE,
      'userId': type.INTEGER,
    }
  )
  return Task;
} 