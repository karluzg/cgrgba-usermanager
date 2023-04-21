var express = require('express');
var router = express.Router();
const validator = require('./validations.js');
const uuidV4 = require('uuid/v4');
const models = require('../ORM/orm_tables.js');

/**
 * @api {get} /Permission Get all the permissions
 * @apiName getPermissions
 * @apiGroup Permissions
 *
 * @apiParam {Object[]} list The permissions list
 * @apiParam {Object} permission The permission object
 * @apiParam {UUID} permission.ID The permission id
 * @apiParam {String} permission.Name The permission name
 * @apiParam {String} permission.Description The permission description
 * @apiParam {Number} permission.Type The permission type
 * @apiParam {String} permission.Value The permission value
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 *      [
 *              {
 *                  "ID": 7688989f-e3c5-44a5-ada2-71985765c828,
 *                  "Name": "Ambiente",
 *                  "Description": "acesso as informações de ambiente",
 *                  "Type": 1,
 *                  "Value": null
 *              },
 *      ]
 *
 */
router.get('/Permission', function (req, res, next) {

    models.Permission.findAll().then(permissions => {
        res.send(permissions);
    });

});


/**
 * @api {get} /Role/:roleId/Permission Get the roles from this permission
 * @apiName getPermissionsFromRole
 * @apiGroup Role
 * 
 * @apiParam {UUID} roleId The role id
 *
 * @apiSuccess {Object[]} list The permissions list
 * @apiSuccess {Object} object The permission object
 * @apiSuccess {UUID} ID The role id
 * @apiSuccess {String} Name The permission name
 * @apiSuccess {String} Description The permission description
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 *       [
 *           {
 *               "ID": "89c34003-d9b8-4579-ac92-c7a5740cf6fb",
 *               "Name": null,
 *               "Description": null,
 *               "Type": 1,
 *               "Value": null
 *           }
 *       ]
 *
 */
router.get('/Role/:roleId/Permission', validator.roleIdValidation(), validator.validate, function (req, res, next) {

    models.RolePermission.findAll({
        where: {
            Role_ID: req.params.roleId
        },
        include: [
            {
                model: models.Permission,
                require: true
            }]
    }).then(permissions => {
        tidyPermissionsResult(permissions, res);
    });

});

/**
 * @api {get} /Permission/User/:userId?topic=:topic Get the permissions from a user using a specific topic
 * @apiName getPermissionTopicByUser
 * @apiGroup Permissions
 *
 * @apiParam {UUID} userId The user id
 * @apiParam {Number} topic The topic id
 *
 * @apiSuccess {Object[]} permissions The users permission by topic
 * @apiSuccess {UUID} ID The permission id
 * @apiSuccess {String} Description The permission description
 * @apiSuccess {Number} Type The permission type
 * @apiSuccess {String} Value The permission value
 *
 * @apiSuccessExample {json} Success-response:
 *     HTTP/1.1 200 OK
 *
 *       [
 *          {
 *                 "ID": 22,
 *                 "Description": "acesso as informações de ambiente",
 *                 "Type": "info_topic",
 *                 "Value": "environment"
 *          },
 *       ]
 *
 * @apiUse InternalServerError
 *
 * @apiUse UnprocessableEntityError
 * 
 */

/**
 * @api {get} /Permission/User/:userId?role=:roleId Get the permissions from a user using a specific role
 * @apiName getPermissionsRoleByUser
 * @apiGroup Permissions
 *
 * @apiParam {UUID} userId The user id
 * @apiParam {UUID} roleId The role id
 *
 *
 * @apiSuccess {Object[]} permissions The permissions list
 * @apiSuccess {UUID} ID The permission id
 * @apiSuccess {String} Name The permission name
 * @apiSuccess {String} Description The permission description
 * @apiSuccess {Number} Type The permission type
 * @apiSuccess {String} Value The permission value
 *
 * @apiSuccessExample {json} Success-response:
 *     HTTP/1.1 200 OK
 *
 *
 *    [
 *          {
 *               "ID": 22,
 *               "Name": "Ambiente",
 *               "Description": "acesso as informações de ambiente",
 *               "Type": integer,
 *               "Value": "environment"
 *          },
 *    ]
 *
 * @apiUse InternalServerError
 *
 * @apiUse UnprocessableEntityError
 * 
 */
router.get('/Permission/User/:userId', validator.getPermissionsValidations(), validator.validate, function (req, res, next) {

    if ((typeof req.query.role == "undefined") && (typeof req.query.topic == "undefined")) {

        getUserPermissions(req, res);

    } else if (typeof req.query.role != "undefined") {

        getUserPermissionsByRole(req, res);

    } else if (typeof req.query.topic != "undefined") {
        getUserPermissionsByTopic(req, res);
    }

});



/**
 * @api {get} /Permission/HasPermission/:userId?permission=:permissionId Check if the user has the permission using its permission id
 * @apiName hasPermission
 * @apiGroup Permissions
 *
 * @apiParam {UUID} userId The user id
 * @apiParam {UUID} permission The permission id
 *
 * @apiSuccess {Bool} bool The permission existence
 * 
 * @apiSuccessExample {bool} Success-response:
 *     HTTP/1.1 200 OK
 *     
 *     true/false

 *
 * @apiUse InternalServerError
 *
 * @apiUse UnprocessableEntityError
 *
 */

/**
 * @api {get} /Permission/HasPermission/:userId?value=:permissionValue Check if the user has permission using the value
 * @apiName hasPermissionByValue
 * @apiGroup Permissions
 *
 * @apiParam {UUID} userId The user id
 * @apiParam {String} permissionValue The permission value
 *
 *
 * @apiSuccessExample {bool} Success-response:
 *     HTTP/1.1 200 OK
 *
 *      true/false
 *
 * @apiUse InternalServerError
 *
 * @apiUse UnprocessableEntityError
 *
 */
router.get('/Permission/HasPermission/:userId', validator.hasPermissionValidations(), validator.validate, function (req, res, next) {

    if ((typeof req.query.permission == "undefined") && (typeof req.query.value == "undefined")) {

        hasPermission(req, res);

    } else if (typeof req.query.permission != "undefined") {

        hasPermissionById(req, res);

    } else if (typeof req.query.value != "undefined") {

        hasPermissionByValue(req, res);
    }

});


/**
 * @api {post} /Permission Add a permission
 * @apiName addPermission
 * @apiGroup Permissions
 * 
 * @apiParam {String} Name The permission name
 * @apiParam {String} Description The permission description
 * @apiParam {String} Value The permission value
 * @apiParam {Number} Type The permission type
 * 
 * @apiParamExample {json} Request-Example:
 *     HTTP/1.1 200 OK
 *
 *       {
 *           "Name": string,
 *           "Description": string,
 *           "Value": string,
 *           "Type": integer
 *       } 
 *       
 *       
 * @apiSuccess {Object} result The result object
 * @apiSuccess {Number} result.state The result state
 * @apiSuccess {String} result.description The result description
 *
 * @apiSuccessExample {json} Success-response:
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
router.post('/Permission', validator.addPermissionValidations(), validator.validate, function (req, res, next) {

    let unique_id = uuidV4();

    models.Permission.create({

        ID: unique_id,
        Name: req.body.Name,
        Description: req.body.Description,
        Value: req.body.Value,
        Type: req.body.Type

    }).then(permission => {
        res.json({ result: { state: 5, description: "Adicionado com sucesso!", id: unique_id } });
    });
});

/**
 * @api {delete} /Permission/:permissionId Remove the permission
 * @apiName removePermission
 * @apiGroup Permissions
 *
 * @apiParam {UUID} permissionId Permission id 
 * 
 * @apiSuccess {Object} result The result object
 * @apiSuccess {Number} result.state The result state
 * @apiSuccess {String} result.description The result description
 *
 * @apiSuccessExample {json} Success
 *     HTTP/1.1 200 OK
 *
 *        {
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
router.delete('/Permission/:permissionId', validator.permissionIdValidation(), validator.validate, function (req, res, next) {
    models.Permission.destroy({
        where: {
            ID: req.params.permissionId
        }
    }).then(result => {

        if (result === 0) { //Errors from database 

            res.status(500).json({
                errors: [{ status: 500, title: "Internal Server Error", description: "Permission doesn't exist" }],
            })

        } else {

            res.json({ result: { state: 5, description: "Removido com sucesso!" } }); 
        }

    }).catch(error => { //Exceptions from sequelize (some can be violations from database)

        res.status(500).json({
            errors: [{ status: 500, description: error.parent.detail }],
        })
    });

});


module.exports = router;

//----------------------------------------------AUX FUNCTIONS----------------------------------------------------------------------
/// <summary>Queries the database for a user permissions</summary>
/// <param name="req" type="Object">The request</param>
/// <param name="res" type="Object">The result</param>
function getUserPermissions(req, res) {
    models.UserRole.findAll({
        where: {
            User_ID: req.params.userId
        },
        include: [
            {
                model: models.Role,
                require: true,
                include: [
                    {
                        model: models.RolePermission,
                        require: true,
                        include: [
                            {
                                model: models.Permission,
                                require: true
                            }
                        ]
                    }
                ]
            }
        ]

    }).then(permissions => {

        tidyPermissions(permissions, res);

    }).catch(error => {
          res.status(500).json({
            errors: [{ status: 500, description: error.parent.detail }],
        })
    });
}


/// <summary>Queries the database for a user permissions by role</summary>
/// <param name="req" type="Object">The request</param>
/// <param name="res" type="Object">The result</param>
function getUserPermissionsByRole(req, res) {
    models.UserRole.findAll({
        where: {
            User_ID: req.params.userId
        },
        include: [
            {
                model: models.Role,
                require: true,
                where: {
                    ID: req.query.role
                },
                include: [
                    {
                        model: models.RolePermission,
                        require: true,
                        include: [
                            {
                                model: models.Permission,
                                require: true
                            }
                        ]
                    }
                ]
            }
        ]

    }).then(permissions => {

        tidyPermissions(permissions, res);

    }).catch(error => {
        res.status(500).json({
            errors: [{ status: 500, description: error.parent.detail }],
        })
    });
}


/// <summary>Queries the database for a user permissions by topic</summary>
/// <param name="req" type="Object">The request</param>
/// <param name="res" type="Object">The result</param>
function getUserPermissionsByTopic(req, res) {
    models.UserRole.findAll({
        where: {
            User_ID: req.params.userId
        },
        include: [
            {
                model: models.Role,
                include: [
                    {
                        model: models.RolePermission,
                        include: [
                            {
                                model: models.Permission,
                                require: true
                            }
                        ]
                    }
                ]
            }
        ]

    }).then(permissions => {

        tidyPermissions(permissions, res);

    }).catch(error => {
        res.status(500).json({
            errors: [{ status: 500, description: error.parent.detail }],
        })
    });
}


/// <summary>Queries the database for a permission by value</summary>
/// <param name="req" type="Object">The request</param>
/// <param name="res" type="Object">The result</param>
function hasPermissionByValue(req, res) {
    models.UserRole.findAll({
        include: [
            {
                model: models.Role,
                required: true,
                include: [
                    {
                        model: models.RolePermission,
                        required: true,
                        include: [
                            {
                                model: models.Permission,
                                required: true,
                                where: {
                                    Value: req.query.value
                                }
                            }
                        ]
                    }
                ]
            }
        ],
        where: {
            User_ID: req.params.userId,
        }

    }).then(query_result => {

        if (query_result.length === 0) {
            res.send(false);
        }
        else {
            res.send(true);
        }
    });
}


/// <summary>Queries the database for a user permission by its id</summary>
/// <param name="req" type="Object">The request</param>
/// <param name="res" type="Object">The result</param>
function hasPermissionById(req, res) {
    models.UserRole.findAll({
        include: [
            {
                model: models.Role,
                required: true,
                include: [
                    {
                        model: models.RolePermission,
                        required: true,
                        where: {
                            Permission_ID: req.query.permission
                        }
                    }
                ],
            }
        ],
        where: {
            User_ID: req.params.userId,
        }
    }).then(query_result => {
        if (query_result.length === 0) {
            res.send(false);
        }
        else {
            res.send(true);
        }
    });
}


/// <summary>Queries the database for permission</summary>
/// <param name="req" type="Object">The request</param>
/// <param name="res" type="Object">The result</param>
function hasPermission(req, res) {
    models.UserRole.findAll({
        include: [
            {
                model: models.Role,
                required: true,
                include: [
                    {
                        model: models.RolePermission,
                        required: true,
                    }
                ],
            }
        ],
        where: {
            User_ID: req.params.userId,
        }
    }).then(query_result => {
        if (query_result.length === 0) {
            res.send(false);
        }
        else {
            res.send(true);
        }
    });
}


/// <summary>Tidies the permissions object</summary>
/// <param name="objects" type="Object">The permissions result</param>
/// <param name="res" type="Object">The result</param>
function tidyPermissions(permissions_result, res) {

    const tidy_roles = permissions_result.map(object => {

        return Object.assign(
            object.Role.RolePermissions.map(rolePermission => {

                return Object.assign(
                    {
                        ID: rolePermission.Permission.ID,
                        Name: rolePermission.Permission.Name,
                        Description: rolePermission.Permission.Description,
                        Type: rolePermission.Permission.Type,
                        Value: rolePermission.Permission.Value
                    }
                );
            })
        );
    });

    res.json(tidy_roles.flat());
}

/// <summary>Tidies the permissions object</summary>
/// <param name="objects" type="Object">The permissions result</param>
/// <param name="res" type="Object">The result</param>
function tidyPermissionsResult(permissions_result, res) {

    const tidy_roles = permissions_result.map(permission => {

                return Object.assign(
                    {
                        ID: permission.Permission.ID,
                        Name: permission.Permission.Name,
                        Description: permission.Permission.Description,
                        Type: permission.Permission.Type,
                        Value: permission.Permission.Value
                    }
                );
    });

    res.json(tidy_roles.flat());
}