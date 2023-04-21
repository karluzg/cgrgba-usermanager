var { body, param, query, validationResult } = require('express-validator');


/**
 * @apiDefine InternalServerError
 *
 * @apiError InternalServerError Database error
 *
 * @apiErrorExample Error-Response:
 *       {
 *           "errors": [
 *               {
 *                   "status": 500,
 *                   "title": "Internal Server Error",
 *                   "description: "description"
 *               }
 *           ]
 *       }
 */

/**
 * @apiDefine UnprocessableEntityError
 *
 * @apiError UnprocessableEntityError The data format isn't correct
 *
 * @apiErrorExample Error - Response:
 *
 *      {
 *           "errors": [
 *               {
 *                   "status": 422,
 *                   "title": "Unprocessable Entity",
 *                   "value": "Invalid value"
 *               }
 *           ]
 *       }
 */

exports.userIdValidation = () => {
    return [
        
        param('userId').isUUID(),
    ]
}

exports.roleIdValidation = () => {
    return [

        param('roleId').isUUID(),
    ]
}

exports.permissionIdValidation = () => {
    return [

        param('permissionId').isUUID(),
    ]
}

exports.addUserValidations = () => {
    return [
        body('UserName').exists(),
        body('Email').isLength({ min: 6 }).isEmail(),
        body('Password').isLength({ min: 6 })
    ]
}

exports.changeStateValidations = () => {
    return [

        param('userId').isUUID(),
        body('State').isInt({ min: 1, max: 3 }).optional(),
        body('Password').isLength({ min: 6 }).optional()
    ]
}


exports.addUserRoleValidations = () => {
    return [

        param('userId').isUUID(),
        body('RoleId').isUUID()
    ]
}


exports.removeUserRoleValidations = () => {
    return [

        param('userId').isUUID(),
        param('roleId').isUUID()
    ]
}


exports.deleteRolePermissionValidations = () => {
    return [

        param('permissionId').isUUID(),
        param('roleId').isUUID(),
    ]
}

exports.addPermissionValidations = () => {
    return [

        body('Type').isInt({min:1, max:3}) 
    ]
}

exports.addPermissionToRoleValidations = () => {
    return [

        body('PermissionId').isUUID(),
        param('roleId').isUUID()
    ]
}

exports.hasPermissionValidations = () => {
    return [

        param('userId').isUUID(),
        query('permission').isUUID().optional(),
    ]
}

exports.loginValidations = () => {
    return [

        body('UserName').exists(),
        body('Password').isLength({ min: 6 })
    ]
}


exports.getPermissionsValidations = () => {
    return [

        param('userId').isUUID(),
        query('permissionId').isUUID().optional()
    ]
}

exports.getUserValidations = () => {
    return [

        param('userId').isUUID().optional()
    ]
}

exports.validate = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ status: 422, title: "Unprocessable Entity", [err.param]: err.msg }));

    return res.status(422).json({errors: extractedErrors,})
}