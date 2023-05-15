const { Model, DataTypes } = require("sequelize");

function UserGameHistoryModel(sequelize) {
    class UserGameHistory extends Model {}

    UserGameHistory.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            // references: 
        },
        game_id: {
            type: DataTypes.INTEGER,
            // references: 
        },
        score: {
            type: DataTypes.INTEGER,
        },
        played_at: {
            type: DataTypes.DATE,
        },
    }, {
        sequelize,
        tableName: 'user_game_histories',
        timestamps: false,
    });

    return UserGameHistory;
}

module.exports = UserGameHistoryModel;