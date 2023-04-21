const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const sequelize = new Sequelize('LVpDUserManager', 'postgres', 'Thales01*', {
    host: 'smartcity.isr.tecnico.ulisboa.pt',
    port: 10001,
    dialect: 'postgres'
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

//Class name shall be singular because sequelizer automatically transforms it to plural
//schema must be in every single table

class User extends Model { }
User.init({
    ID: {
        type: Sequelize.UUID,
        primaryKey: true,
    },
    Name: Sequelize.STRING,
    Email: Sequelize.STRING,
    UserName: Sequelize.STRING,
    Password: Sequelize.STRING,
    PasswordSalt: Sequelize.STRING,
    CreationDate: {
        type: Sequelize.DATE,
        allowNull: false

    },
    State: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    LastConnection: {
        type: Sequelize.DATE,
        allowNull: false
    },

}, {
    sequelize,
    modelName: 'User',
    timestamps: false,
    schema: "dbo"
});


class Permission extends Model { }
Permission.init({
    ID: {
        type: Sequelize.UUID,
        primaryKey: true,
    },
    Name: Sequelize.STRING,
    Description: Sequelize.STRING,
    Value: Sequelize.STRING,
    Type: Sequelize.INTEGER,
}, {
    sequelize,
    modelName: 'Permission',
    timestamps: false,
    schema: "dbo"
});


class UserRole extends Model { }
UserRole.init({
    User_ID: {
        type: Sequelize.UUID,
        primaryKey: true,
    },
    Role_ID: {
        type: Sequelize.UUID,
        primaryKey: true,
    },

}, {
    sequelize,
    modelName: 'UserRole',
    timestamps: false,
    schema: "dbo"
});


class RolePermission extends Model { }
RolePermission.init({
    Role_ID: {
        type: Sequelize.UUID,
        primaryKey: true,
    },
    Permission_ID: {
        type: Sequelize.UUID,
        primaryKey: true,
    },
}, {
    sequelize,
    modelName: 'RolePermission',
    timestamps: false,
    schema: "dbo"
});



class Role extends Model { }
Role.init({
    ID: {
        type: Sequelize.UUID,
        primaryKey: true,
    },
    Name: Sequelize.STRING,
    Description: Sequelize.STRING,

}, {
    sequelize,
    modelName: 'Role',
    timestamps: false,
    schema: "dbo"
});

User.hasMany(UserRole, { foreignKey: 'User_ID', sourceKey: 'ID' }); //1:M
UserRole.belongsTo(User, { foreignKey: 'User_ID', targetKey: 'ID' });

Role.hasMany(UserRole, { foreignKey: 'Role_ID', sourceKey: 'ID' });
UserRole.belongsTo(Role, { foreignKey: 'Role_ID', targetKey: 'ID' });

Role.hasMany(RolePermission, { foreignKey: 'Role_ID', sourceKey: 'ID' });
RolePermission.belongsTo(Role, { foreignKey: 'Role_ID', targetKey: 'ID' });

Permission.hasMany(RolePermission, { foreignKey: 'Permission_ID', sourceKey: 'ID' });
RolePermission.belongsTo(Permission, { foreignKey: 'Permission_ID', sourceKey: 'ID' });

module.exports = {
    Role: Role,
    Permission: Permission,
    User: User,
    RolePermission: RolePermission,
    UserRole: UserRole
}