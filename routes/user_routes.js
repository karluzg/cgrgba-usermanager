var express = require('express');
var router = express.Router();
const validator = require('./validations.js');
const uuidV4 = require('uuid/v4');
const models = require('../ORM/orm_tables.js');
var crypto = require('crypto');

/**
 * @api {get} /User?:userId=id Get the user by id
 * @apiName getUserByID
 * @apiGroup User
 * 
 * @apiParam {UUID} userId The user id
 * 
 * @apiSuccess {UUID} ID The user id
 * @apiSuccess {String} Name The name of the user
 * @apiSuccess {String} Email The email of the user
 * @apiSuccess {String} UserName The username
 * @apiSuccess {String} Password The user hashed password
 * @apiSuccess {String} PasswordSalt The user password salt
 * @apiSuccess {TimeStamp} CreationDate This user creation date.This is a timestamp without timezone
 * @apiSuccess {Number} State The user current state
 * @apiSuccess {TimeStamp} LastConnection This user last connection date. This is a timestamp without timezone
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 *      {
 *           "ID": "a544261a-7167-44af-83a3-f0f6d7859981",
 *           "Name": "string",
 *           "Email": null,
 *           "UserName": null,
 *           "Password": null,
 *           "PasswordSalt": null,
 *           "CreationDate": "2004-10-19T09:23:54.000Z",
 *           "State": 3,
 *           "LastConnection": "2004-10-19T09:23:54.000Z"
 *       }
 *
 * @apiUse InternalServerError
 *     
 * @apiUse UnprocessableEntityError
 */

/**
 * @api {get} /User?:username=username Get the user by username
 * @apiName getUserByUsername
 * @apiGroup User
 *
 * @apiParam {UUID} userId The user id
 *
 * @apiSuccess {UUID} ID The user id
 * @apiSuccess {String} Nme The name of the user
 * @apiSuccess {String} Email The email of the user
 * @apiSuccess {String} UserName The username
 * @apiSuccess {String} Password The user hashed password
 * @apiSuccess {String} PasswordSalt The user password salt
 * @apiSuccess {TimeStamp} CreationDate This user creation date.This is a timestamp without timezone
 * @apiSuccess {Number} State The user current state
 * @apiSuccess {TimeStamp} LastConnection This user last connection date. This is a timestamp without timezone
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 *      {
 *           "ID": "a544261a-7167-44af-83a3-f0f6d7859981",
 *           "Name": "string",
 *           "Email": null,
 *           "UserName": null,
 *           "Password": null,
 *           "PasswordSalt": null,
 *           "CreationDate": "2004-10-19T09:23:54.000Z",
 *           "State": 3,
 *           "LastConnection": "2004-10-19T09:23:54.000Z"
 *       }
 *
 * @apiUse InternalServerError
 *
 * @apiUse UnprocessableEntityError
 */

/**
 * @api {get} /User Get all the users
 * @apiName getUsers
 * @apiGroup User
 *
 * @apiSuccess {UUID} ID The user id
 * @apiSuccess {String} Name The name of the user
 * @apiSuccess {String} Email The email of the user
 * @apiSuccess {String} UserName The username
 * @apiSuccess {String} Password The hashed password
 * @apiSuccess {String} PasswordSalt The password salt
 * @apiSuccess {TimeStamp} CreationDate The user creation date. This is a timestamp without timezone
 * @apiSuccess {Number} State The user current state
 * @apiSuccess {TimeStamp} LastConnection The user last connection date. This is a timestamp without timezone
 * 
 * @apiSuccessExample {list} Success-Response:
 *     HTTP/1.1 200 OK
 *
 *  [
 *      {
 *          "ID": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
 *          "Name": "string",
 *          "Email": "string",
 *          "UserName": "string",
 *          "Password": "string",
 *          "PasswordSalt": "ew",
 *          "CreationDate": "2004-10-19T09:23:54.000Z",
 *          "State": 1,
 *          "LastConnection": "2004-10-19T09:23:54.000Z"
 *       }
 *  ]
 *
 */
router.get('/User', validator.getUserValidations(), validator.validate, function (req, res, next) {

    if ((typeof req.query.userId == "undefined") && (typeof req.query.username == "undefined")) {

        getUsers(req, res);

    } else if (typeof req.query.userId != "undefined") {

        getUserById(req, res);

    } else if (typeof req.query.username != "undefined") {

        getUserByUsername(req, res);
    }
});


/**
 * @api {post} /User Add a user 
 * @apiName addUser
 * @apiGroup User
 * 
 * @apiParam {String} Name The user name
 * @apiParam {String} UserName The username
 * @apiParam {String} Password The user password
 * @apiParam {String} Email The user email
 * 
 * @apiParamExample {json} Request-Example:
 *     {
 *       "Name": string,
 *       "UserName": string,
 *       "Password": string,
 *       "Email": string
 *     }
 *
 * @apiSuccess {Object} result The result object
 * @apiSuccess {Number} result.state The result state
 * @apiSuccess {String} result.description The result description
 * @apiSuccess {UUID} result.id The user id
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 *        {
 *           "result": {
 *               "state": 5,
 *               "description": "Adicionado com sucesso!",
 *               "id": "uuid"
 *               
 *           }
 *       }
 *
 * @apiUse InternalServerError
 *
 * @apiUse UnprocessableEntityError
 * 
 */
router.post('/User', validator.addUserValidations(), validator.validate, function (req, res, next) {

    let hashed_data = passwordAndSaltHashing(req.body.Password);
    let unique_id = uuidV4();

    models.User.create({
        ID: unique_id,
        Name: req.body.Name,
        UserName: req.body.UserName,
        Email: req.body.Email,
        Password: hashed_data.password_hash,
        PasswordSalt: hashed_data.password_salt,
        CreationDate: new Date(),
        State: 2, //Desactive
        LastConnection: new Date()

    }).then(() => {
        res.json({ result: { state: 5, description: "Adicionado com sucesso!", id: unique_id } });
    });
});


/**
 * @api {delete} /User/:userId Delete a user
 * @apiName removeUser
 * @apiGroup User
 *
 * @apiParam {UUID} userId The user id
 * 
 * @apiSuccess {Object} result The result object
 * @apiSuccess {Number} result.state The result state 
 * @apiSuccess {String} result.description The result description
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 *       {
 *           "result": {
 *               "state": 5,
 *               "description": "Removido com sucesso!"
 *           }
 *       }
 *     
 * @apiUse InternalServerError
 *
 * @apiUse UnprocessableEntityError
 * 
 **/      
router.delete('/User/:userId', validator.userIdValidation(), validator.validate, function (req, res, next) {

    models.User.update({ State: 3 }, {

        where: {
            ID: req.params.userId
        }

    }).then(result => {

        if (result[0] === 0) { //Errors from database 

            res.status(500).json({
                errors: [{ status: 500, title: "Internal Server Error", description: "UserId/RoleId doesn't exist" }],
            })

        } else {

            res.json({ "result": { "state": 5, "description": "Removido com sucesso!" } });
        }

    }).catch(error => { //Exceptions from sequelize (some can be violations from database)

        res.status(500).json({
            errors: [{ status: 500, title: error.parent.title, description: error.parent.description }],
        })
    });
   
});


/**
 * @api {post} /User/:userId/Role Add a role to the user
 * @apiName addUserRole
 * @apiGroup User
 * 
 * @apiParam {UUID} userId The user id
 * @apiParam {UUID} RoleId The role id
 * 
 * @apiParamExample {json} Request-Example:
 *     {
 *       "RoleId": uuid,
 *     } 
 *     
 *     
 * @apiSuccess {Object} result Result object
 * @apiSuccess {Number} result.state The result state
 * @apiSuccess {String} result.description The result description
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 *        {
 *           "result": {
 *               "state": 5,
 *               "description": "Adicionado com sucesso!"
 *           }
 *       }
 *
 * @apiUse InternalServerError
 *
 * @apiUse UnprocessableEntityError
 * 
 **/
router.post('/User/:userId/Role', validator.addUserRoleValidations(), validator.validate, function (req, res, next) {

    models.UserRole.create({
        User_ID: req.params.userId,
        Role_ID: req.body.RoleId

    }).then(result => {

        if (result === 0) { //Errors from database 

            res.status(500).json({
                errors: [{ status: 500, title: "Internal Server Error", description: "Permission/Role doesn't exist" }],
            })

        } else {

            res.json({ "result": { "state": 5, "description": "Adicionado com sucesso!" } });
        }

        res.json(result);

    }).catch(error => { //Exceptions from sequelize (some can be violations from database)

        res.status(500).json({
            errors: [{ status: 500, title: error.parent.title, description: error.parent.detail }],
        });
    });
});


/**
 * @api {delete} /User/:userId/Role/:roleId  Delete a role from a user
 * @apiName deleteUserRole
 * @apiGroup User
 *
 * @apiParam {UUID} userId The user id
 * @apiParam {UUID} roleId The role id
 *     
 * @apiSuccess {Object} result The result object
 * @apiSuccess {Number} result.state The result state 
 * @apiSuccess {String} result.description The result description
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 *       {
 *           "result": {
 *               "state": 5,
 *               "description": "Removido com sucesso!"
 *           }
 *       }
 *
 * @apiUse InternalServerError
 *
 * @apiUse UnprocessableEntityError
 * 
 */
router.delete('/User/:userId/Role/:roleId', validator.removeUserRoleValidations(), validator.validate, function (req, res, next) {
    models.UserRole.destroy({
        where: {
            User_ID: req.params.userId,
            Role_ID: req.params.roleId
            // DELETE FROM UserRole WHERE User_ID = userId AND Role_ID = roleId;
        }
    }).then(result => {

        if (result === 0) { //Errors from database 

            res.status(500).json({
                errors: [{ status: 500, title: "Internal Server Error", description: "UserId/RoleId doesn't exist" }],
            })

        } else {

            res.json({ "result": { "state": 5, "description": "Removido com sucesso!" } });
        }

    }).catch(error => { //Exceptions from sequelize (some can be violations from database)

        res.status(500).json({
            errors: [{ status: 500, title: error.parent.title, description: error.parent.description}],
        })
    });
});


/**
 * @api {put} /User/:userId Change the state of the user
 * @apiName changeUser
 * @apiGroup User
 * 
 * @apiParam {UUID} userId The user id
 * 
 * @apiParam {Integer} State The user new state
 * @apiParam {String} Name The user new name
 * @apiParam {String} Email The user new email
 * @apiParam {String} Password The user new password
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "State": integer,
 *       "Name": string,
 *       "Email": string,
 *       "Password": string
 *     }
 *
 * @apiSuccess {Object} result The result object
 * @apiSuccess {Number} result.state The result state
 * @apiSuccess {String} result.description The result description
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 *        {
 *           "result": {
 *               "state": 5,
 *               "description": "Alterado com sucesso!"
 *           }
 *       }
 *
 * @apiUse InternalServerError
 *
 * @apiUse UnprocessableEntityError
 * 
 */       
router.put('/User/:userId', validator.changeStateValidations(), validator.validate, function (req, res, next) {

    if (checkRequestBodyParameters(req)) {

        updateUserInfo(req.params.userId, req.body, res);

    }else {
        res.status(400).json({
            errors: [{ status: 400, title: "Bad Request", description: "You cannot change that value" }],
        })
    }
});


//-------------------------------------------------------Auxiliary functions-----------------------------------


function checkRequestBodyParameters(req) {
    return !("ID" in req.body) && !("CreationDate" in req.body) && !("LastConnection" in req.body) && !("PasswordSalt" in req.body);
}


function updateUserInfo(user_id, obj, res) {

    if(obj.Password != undefined){

        hashed_data = passwordAndSaltHashing(obj.Password);
        obj.Password = hashed_data.password_hash;
        obj.PasswordSalt = hashed_data.password_salt;
    }

    models.User.update(obj, {

        where: {
            ID: user_id
        }

    }).then(result => {

        if (result[0] === 0) { //Errors from database

            res.status(500).json({
                errors: [{ status: 500, title: "Internal Server Error", description: "User doesn't exist" }],
            })

        } else {

            res.json({ result: { state: 5, description: "Alterado com sucesso!" } });
        }

    }).catch(error => { //Exceptions from sequelize (some can be violations from database)

        res.status(500).json({
            errors: [{ status: 500, title: error.parent.title, description: error.parent.description}],
        })
    });
}


function getUsers(req, res) {

    models.User.findAll().then(users => {
        res.send(users);
    });
}


function getUserById(req, res) {

    models.User.findAll({
        where: {

            ID: req.query.userId
        }
    }).then(user => {

        if (user.length === 0) { //Errors from database 

            res.status(500).json({
                errors: [{ status: 500, title: "Internal Server Error", description: "User doesn't exist" }],
            })

        } else {

            res.send(user[0]);
        }

    });
}


function getUserByUsername(req, res) {

    models.User.findAll({
        where: {

            UserName: req.query.username
        }
    }).then(user => {

        if (user.length === 0) { //Errors from database 

            res.status(500).json({
                errors: [{ status: 500, title: "Internal Server Error", description: "User doesn't exist" }],
            })

        } else {

            res.send(user[0]);
        }

    });
}


/// <summary>Creates the random salt for the password.</summary>
/// <param name="length" type="Number">The salt length</param>
/// <returns type="String">The salt.</returns>
function createSalt(length) {

    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') 
        .slice(0, length);

}

/// <summary>Creates the hashed password and salt</summary>
/// <param name="password" type="String">The password</param>
/// <returns type="Object">The hashed object</returns>
function passwordAndSaltHashing(password) {

    let salt = createSalt(16);
    //createHmac(algorithm, key)
    let hashed_password = crypto.createHmac('sha512', salt).update(password).digest('hex');

    hashed_data = {
        password_salt: salt,
        password_hash: hashed_password
    }

    return hashed_data;
}


module.exports = router;
