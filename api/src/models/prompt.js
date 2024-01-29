module.exports = function (sequelize, DataTypes) {
  const Prompt = sequelize.define('Prompt', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    chatId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    prompt: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      get () {
        return this.getDataValue('createdAt')
          ? this.getDataValue('createdAt').toISOString().split('T')[0]
          : null
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      get () {
        return this.getDataValue('updatedAt')
          ? this.getDataValue('updatedAt').toISOString().split('T')[0]
          : null
      }
    }
  }, {
    sequelize,
    tableName: 'prompts',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'id' }
        ]
      },
      {
        name: 'prompt_chatId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'chatId' }
        ]
      }
    ]
  })

  Prompt.associate = function (models) {
    Prompt.belongsTo(models.Chat, { as: 'Chat', foreignKey: 'chatId' })
  }

  return Prompt
}
