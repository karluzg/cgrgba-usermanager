var express = require('express');
var router = express.Router();
const validator = require('./validations.js');
const uuidV4 = require('uuid/v4');
const models = require('../ORM/orm_tables.js');

/**
 * @api {get} /Role/User/:userId Get all the roles of the specified user
 * @apiName getUserRoles
 * @apiGroup Role
 *
 * @apiParam {UUID} userId The user identifier
 *
 * @apiSuccess {Object[]} list The roles list
 * @apiSuccess {Object} Object The role object
 * @apiSuccess {Number} Object.ID The role id
 * @apiSuccess {String} Object.Name The role name
 * @apiSuccess {String} Object.Description The role description
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 *       [
 *           {
 *               "ID": "a744261a-7167-44af-83a3-f0f6d7859981",
 *               "Name": null,
 *               "Description": null
 *           },
 *           {
 *               "ID": "af148b6c-91f3-43f0-86bf-a50b0c867cbe",
 *               "Name": "string",
 *               "Description": "string"
 *           }
 *       ]
 *
 * @apiUse InternalServerError
 *
 * @apiUse UnprocessableEntityError
 * 
 */
router.get('/Role/User/:userId', validator.userIdValidation(), validator.validate, function (req, res, next) {

    models.UserRole.findAll({
        where: {
            User_ID: req.params.userId,
        },
        include: [{
            model: models.Role,
            required: true,
        }],

    }).then(roles => {

        //Database returns [] if user doesn't exist and if user doesn't have roles
        if (roles.length === 0) {

            res.status(500).json({
                errors: [{ status: 500, title: "Internal Server Error", description: "User doesn't exist or doesn't have roles" }],
            });

        } else {
            tidyRolesFromUserResult(roles, res);
        }

    }).catch(error => {
        res.status(500).json({
            errors: [{ status: 500, title: error.parent.title, description: error.parent.description }],
        });
    });

});


/**
 * @api {get} /Role Get all the roles
 * @apiName getRoles
 * @apiGroup Role
 *
 * @apiSuccess {Object[]} roles The roles list
 * @apiSuccess {Number} ID The role id
 * @apiSuccess {Number} Name The role name
 * @apiSuccess {String} Description The result description
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 *       [
 *           {
 *               "ID": "a544261a-7167-44af-83a3-f0f6d7859981",
 *               "Name": "string",
 *               "Description": "string"
 *           }
 *       ]
 *
 */
router.get('/Role', function (req, res, next) {

    models.Role.findAll().then(roles => {
        res.send(roles);
    });

});



/**
 * @api {post} /Role Add a role
 * @apiName addRole
 * @apiGroup Role
 *
 * @apiParam {String} Name The role name
 * @apiParam {String} Description The role description
 *
 * @apiParamExample {json} Request-Example:
 *     HTTP/1.1 200 OK
 *
 *       {
 *            "Name": string,
 *            "Description": string
 *       }
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
 *               "description": "Adicionado com sucesso!"
 *           }
 *       }
 *
 *
 */
router.post('/Role', function (req, res, next) {

    let unique_id = uuidV4();

    models.Role.create({

        ID: unique_id,
        Name: req.body.Name,
        Description: req.body.Description

    }).then(role => {
        res.json({ result: { state: 5, description: "Adicionado com sucesso!", id: unique_id } });
    });
});


/**
 * @api {delete} /Role/:roleId Remove role
 * @apiName removeRole
 * @apiGroup Role
 * 
 * @apiParam {UUID} roleId The role identifier
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
 *               "description": "Eliminado com sucesso!"
 *           }
 *       }
 *       
 * @apiUse UnprocessableEntityError
 * 
 * @apiUse InternalServerError
 * 
 */
router.delete('/Role/:roleId', validator.roleIdValidation(), validator.validate, function (req, res, next) {

    models.Role.destroy({
        where: {
            ID: req.params.roleId
        }

    }).then(result => {

        if (result === 0) { //Errors from database 

            res.status(500).json({
                errors: [{ status: 500, title: "Internal Server Errro", description: "Role doesn't exist" }],
            })

        } else {

            res.json({ "result": { "state": 5, "description": "Removido com sucesso!" } });
        }

    }).catch(error => { //Exceptions from sequelize (some can be violations from database)

        res.status(500).json({
            errors: [{ status: 500, title: error.parent.title, description: error.parent.detail }],
        })
    });
});

/**
 * @api {post} /Role/:roleId/Permission Add a permission to a role
 * @apiName addPermissionToRole
 * @apiGroup Role
 * 
 * @apiParam {UUID} roleId The role id
 * 
 * @apiParam {UUID} PermissionId The permission id 
 * @apiParamExample {json} Request-Example:
 *     HTTP/1.1 200 OK
 *
 *       {
 *           "PermissionId": UUID
 *       } 
 *       
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
 *               "description": "Adicionado com sucesso!"
 *           }
 *       }
 *
 * @apiUse InternalServerError
 *
 * @apiUse UnprocessableEntityError
 * 
 */
router.post('/Role/:roleId/Permission', validator.addPermissionToRoleValidations(), validator.validate, function (req, res, next) {

    models.RolePermission.create({

        Role_ID: req.params.roleId,
        Permission_ID: req.body.PermissionId

    }).then(() => {
        res.json({ "result": { "state": 5, "description": "Adicionado com sucesso!" } });

        //In this case we don't need our usual if because we are dealing with foreign keys so the database sends and error which is caught 
        //by sequelize. Sequelize creates an exception which will be caught 

    }).catch(error => {
        res.status(500).json({
            errors: [{status: 500, title: error.parent.title, description: error.parent.detail}],
        })
    });
});


/**
 * @api {delete} /Role/:roleId/Permission/:permissionId Remove a permission from a role
 * @apiName removePermissionFromRole
 * @apiGroup Role
 *
 * @apiParam {UUID} roleId The role id
 * @apiParam {UUID} permissionId The permission id
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
 *               "description": "Eliminado com sucesso!"
 *           }
 *       }
 *     
 * @apiUse InternalServerError
 *
 * @apiUse UnprocessableEntityError
 *
 */
router.delete('/Role/:roleId/Permission/:permissionId', validator.deleteRolePermissionValidations(), validator.validate, function (req, res, next) {

    models.RolePermission.destroy({
        where: {
            Role_ID: req.params.roleId,
            Permission_ID: req.params.permissionId
        }
    }).then(result => {

        if (result === 0) {

            res.status(500).json({
                errors: [{ status: 500, title: "Internal Server Error", description: "RoleId/PermissionId doesn't exist in database" }],
            });

        } else {
            res.json({ result: { state: 5, description: "Eliminado com sucesso!" } });
        }

    }).catch(error => {
        res.status(500).json({
            errors: [{ status: 500, title: error.parent.title, description: error.parent.description }],
        });
    });
});

module.exports = router;

//-------------------------------------------------AUX FUNCTIONS-----------------------------------------------------------------------------

/// <summary>Tidies the roles result</summary>
/// <param name="roles" type="Object">The roles object</param>
function tidyRolesFromUserResult(roles, res) {
    const tidy_roles = roles.map(role => {

        //Object.assign() is used for cloning an object.
        //Object.assign(target, ...sources)
        return Object.assign(
            {},
            {
                ID: role.Role.ID,
                Name: role.Role.Name,
                Description: role.Role.Description 
            }
        )
    });

    res.json(tidy_roles);
}
