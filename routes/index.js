var express = require('express');
var router = express.Router();
const validator = require('./validations.js');
const models = require('../ORM/orm_tables.js');
var crypto = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('<p>For documentation go to <a href=\'/apidoc\'>/apidoc</a></p>');
});


/**
 * @api {post} /Login User login
 * @apiName login
 * @apiGroup Home 
 *               
 * @apiParam {String} UserName The user username
 * @apiParam {String} Password The user password
 *
 * @apiParamExample {json} Request-Example:
 *     HTTP/1.1 200 OK
 *
 *       {
 *               "UserName": string,
 *               "Password": string
 *       }
 *
 * @apiSuccess {String} State The user current state
 * @apiSuccess {String} Name The name of the user
 * @apiSuccess {String} Email The email of the user
 * @apiSuccess {String} UserName Users password
 * @apiSuccess {Object[]} Roles Users password
 * @apiSuccess {Number} ID The role id
 * @apiSuccess {String} Name Users password
 * @apiSuccess {String} Description Users password
 * @apiSuccess {Object[]} Permissions The users permissions list
 * @apiSuccess {String} Type The permission type
 * @apiSuccess {String} Value The permission value
 *    
 * @apiSuccessExample {json} Success-response:
 *     HTTP/1.1 200 OK
 *     
 *        {
 *               "State": "Active",
 *               "Name": "nome do utilizador",
 *               "Email": "nome@companhia.com",
 *               "UserName": "username",
 *               "Roles": [
 *                   {
 *                       "ID": 25,
 *                       "Name": "app_ext",
 *                       "Description": "Aplicacoes externas",
 *                       "Permissions": [
 *                           {
 *                               "ID": 22,
 *                               "Name": "Ambiente",
 *                               "Description": "acesso as informacoes de ambiente",
 *                               "Type": "info_topic",
 *                               "Value": "environment"
 *                           }
 *                       ]
 *                   }
 *               ]
 *           
 *       }
 *     
 * @apiUse InternalServerError
 *
 * @apiUse UnprocessableEntityError
 *
 */
router.post('/Login', validator.loginValidations(), validator.validate, function(req, res, next) {

    models.User.findOne({
        where: {
            UserName: req.body.UserName,
        }
    }).then(users => {

        if (users === null) {
            res.status(404).json({ "result": { "state": 1, "description": "Utilizador não existe" } });
        } else {
            checkUser(users, req, res); //Username is unique
        }

    });

});

/**
 * @api {get} /Topic Get all the topics
 * @apiName getAllTopics
 * @apiGroup Home
 *
 *
 * @apiSuccessExample {json} Success-response:
 *     HTTP/1.1 200 OK
 *
 *  [
 *       {
 *       } 
 *  ]
 *
 */
router.get('/Topic', function(req, res, next) {
    res.send('permissions_layout');
});


module.exports = router;

//---------------------------------------------------------AUX FUNCTIONS----------------------------------------------------------------------

function checkUser(user, req, res) {

    let password = user.Password;
    let salt = user.PasswordSalt;
    let hashed_password = passwordHashing(req.body.Password, salt);

    if (user.State === 3) {

        res.status(422).json({ "result": { "state": 3, "description": "Utilizador desativado/removido" } });

    } else if (hashed_password !== password) {

        res.status(422).json({ "result": { "state": 2, "description": "Password errada" } });

    } else {
        getUserInfo(user.ID, res);
    }
}


function getUserInfo(user_id, res) {
    models.User.findAll({
        include: [{
            model: models.UserRole,
            include: [{
                model: models.Role,
                include: [{
                    model: models.RolePermission,
                    include: [{
                        model: models.Permission,
                    }],
                }],
            }],
        }],
        where: {
            ID: user_id,
        }
    }).then(users => {

        updateUserStateAndLastConnection(user_id);
        tidyLoginResult(users, res);

    });
}


function updateUserStateAndLastConnection(user_id) {
    models.User.update({
        State: 1,
        LastConnection: new Date()
    }, {
        where: {
            ID: user_id
        }
    }).then(() => {});
}


function passwordHashing(password, salt) {

    //Password and salt can be null values so this is a check
    if (password != null && salt != null) {

        //createHmac(algorithm, key)
        let hashed_password = crypto.createHmac('sha512', salt).update(password).digest('hex');

        return hashed_password;
    }
}


function tidyLoginResult(users, res) {

    const login_result = users.map(user => {

        return Object.assign({}, {
            ID: user.ID,
            State: user.State,
            Name: user.Name,
            Email: user.Email,
            UserName: user.UserName,
            Roles: user.UserRoles.map(userRole => {

                return Object.assign({}, {
                    ID: userRole.Role.ID,
                    Name: userRole.Role.Name,
                    Description: userRole.Role.Description,
                    Permissions: userRole.Role.RolePermissions.map(rolePermission => {

                        return Object.assign({}, {
                            ID: rolePermission.Permission.ID,
                            Name: rolePermission.Permission.Name,
                            Description: rolePermission.Permission.Description,
                            Type: rolePermission.Permission.Type,
                            Value: rolePermission.Permission.Value
                        });
                    })
                })
            })
        });
    });

    res.json(login_result[0]);
}