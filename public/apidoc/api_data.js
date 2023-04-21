define({ "api": [
  {
    "type": "get",
    "url": "/Topic",
    "title": "Get all the topics",
    "name": "getAllTopics",
    "group": "Home",
    "success": {
      "examples": [
        {
          "title": "Success-response:",
          "content": "   HTTP/1.1 200 OK\n\n[\n     {\n     } \n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/index.js",
    "groupTitle": "Home"
  },
  {
    "type": "post",
    "url": "/Login",
    "title": "User login",
    "name": "login",
    "group": "Home",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "UserName",
            "description": "<p>The user username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Password",
            "description": "<p>The user password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "HTTP/1.1 200 OK\n\n  {\n          \"UserName\": string,\n          \"Password\": string\n  }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "State",
            "description": "<p>The user current state</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Name",
            "description": "<p>The name of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Email",
            "description": "<p>The email of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "UserName",
            "description": "<p>Users password</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Roles",
            "description": "<p>Users password</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>The role id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Description",
            "description": "<p>Users password</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Permissions",
            "description": "<p>The users permissions list</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Type",
            "description": "<p>The permission type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Value",
            "description": "<p>The permission value</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-response:",
          "content": "HTTP/1.1 200 OK\n\n   {\n          \"State\": \"Active\",\n          \"Name\": \"nome do utilizador\",\n          \"Email\": \"nome@companhia.com\",\n          \"UserName\": \"username\",\n          \"Roles\": [\n              {\n                  \"ID\": 25,\n                  \"Name\": \"app_ext\",\n                  \"Description\": \"Aplicacoes externas\",\n                  \"Permissions\": [\n                      {\n                          \"ID\": 22,\n                          \"Name\": \"Ambiente\",\n                          \"Description\": \"acesso as informacoes de ambiente\",\n                          \"Type\": \"info_topic\",\n                          \"Value\": \"environment\"\n                      }\n                  ]\n              }\n          ]\n      \n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/index.js",
    "groupTitle": "Home",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Database error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnprocessableEntityError",
            "description": "<p>The data format isn't correct</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"errors\": [\n        {\n            \"status\": 500,\n            \"title\": \"Internal Server Error\",\n            \"description: \"description\"\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Error - Response:",
          "content": "\n{\n     \"errors\": [\n         {\n             \"status\": 422,\n             \"title\": \"Unprocessable Entity\",\n             \"value\": \"Invalid value\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/Permission",
    "title": "Add a permission",
    "name": "addPermission",
    "group": "Permissions",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Name",
            "description": "<p>The permission name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Description",
            "description": "<p>The permission description</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Value",
            "description": "<p>The permission value</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Type",
            "description": "<p>The permission type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "HTTP/1.1 200 OK\n\n  {\n      \"Name\": string,\n      \"Description\": string,\n      \"Value\": string,\n      \"Type\": integer\n  }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>The result object</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.state",
            "description": "<p>The result state</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.description",
            "description": "<p>The result description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-response:",
          "content": "HTTP/1.1 200 OK\n\n  {\n      \"result\": {\n          \"state\": 5,\n          \"description\": \"Adicionado com sucesso!\"\n      }\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/permissions_routes.js",
    "groupTitle": "Permissions",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Database error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnprocessableEntityError",
            "description": "<p>The data format isn't correct</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"errors\": [\n        {\n            \"status\": 500,\n            \"title\": \"Internal Server Error\",\n            \"description: \"description\"\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Error - Response:",
          "content": "\n{\n     \"errors\": [\n         {\n             \"status\": 422,\n             \"title\": \"Unprocessable Entity\",\n             \"value\": \"Invalid value\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/Permission/User/:userId?topic=:topic",
    "title": "Get the permissions from a user using a specific topic",
    "name": "getPermissionTopicByUser",
    "group": "Permissions",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "userId",
            "description": "<p>The user id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "topic",
            "description": "<p>The topic id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "permissions",
            "description": "<p>The users permission by topic</p>"
          },
          {
            "group": "Success 200",
            "type": "UUID",
            "optional": false,
            "field": "ID",
            "description": "<p>The permission id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Description",
            "description": "<p>The permission description</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Type",
            "description": "<p>The permission type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Value",
            "description": "<p>The permission value</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-response:",
          "content": "HTTP/1.1 200 OK\n\n  [\n     {\n            \"ID\": 22,\n            \"Description\": \"acesso as informa��es de ambiente\",\n            \"Type\": \"info_topic\",\n            \"Value\": \"environment\"\n     },\n  ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/permissions_routes.js",
    "groupTitle": "Permissions",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Database error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnprocessableEntityError",
            "description": "<p>The data format isn't correct</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"errors\": [\n        {\n            \"status\": 500,\n            \"title\": \"Internal Server Error\",\n            \"description: \"description\"\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Error - Response:",
          "content": "\n{\n     \"errors\": [\n         {\n             \"status\": 422,\n             \"title\": \"Unprocessable Entity\",\n             \"value\": \"Invalid value\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/Permission",
    "title": "Get all the permissions",
    "name": "getPermissions",
    "group": "Permissions",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "list",
            "description": "<p>The permissions list</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "permission",
            "description": "<p>The permission object</p>"
          },
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "permission.ID",
            "description": "<p>The permission id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "permission.Name",
            "description": "<p>The permission name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "permission.Description",
            "description": "<p>The permission description</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "permission.Type",
            "description": "<p>The permission type</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "permission.Value",
            "description": "<p>The permission value</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n [\n         {\n             \"ID\": 7688989f-e3c5-44a5-ada2-71985765c828,\n             \"Name\": \"Ambiente\",\n             \"Description\": \"acesso as informa��es de ambiente\",\n             \"Type\": 1,\n             \"Value\": null\n         },\n ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/permissions_routes.js",
    "groupTitle": "Permissions"
  },
  {
    "type": "get",
    "url": "/Permission/User/:userId?role=:roleId",
    "title": "Get the permissions from a user using a specific role",
    "name": "getPermissionsRoleByUser",
    "group": "Permissions",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "userId",
            "description": "<p>The user id</p>"
          },
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "roleId",
            "description": "<p>The role id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "permissions",
            "description": "<p>The permissions list</p>"
          },
          {
            "group": "Success 200",
            "type": "UUID",
            "optional": false,
            "field": "ID",
            "description": "<p>The permission id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Name",
            "description": "<p>The permission name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Description",
            "description": "<p>The permission description</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Type",
            "description": "<p>The permission type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Value",
            "description": "<p>The permission value</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-response:",
          "content": " HTTP/1.1 200 OK\n\n\n[\n      {\n           \"ID\": 22,\n           \"Name\": \"Ambiente\",\n           \"Description\": \"acesso as informa��es de ambiente\",\n           \"Type\": integer,\n           \"Value\": \"environment\"\n      },\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/permissions_routes.js",
    "groupTitle": "Permissions",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Database error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnprocessableEntityError",
            "description": "<p>The data format isn't correct</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"errors\": [\n        {\n            \"status\": 500,\n            \"title\": \"Internal Server Error\",\n            \"description: \"description\"\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Error - Response:",
          "content": "\n{\n     \"errors\": [\n         {\n             \"status\": 422,\n             \"title\": \"Unprocessable Entity\",\n             \"value\": \"Invalid value\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/Permission/HasPermission/:userId?permission=:permissionId",
    "title": "Check if the user has the permission using its permission id",
    "name": "hasPermission",
    "group": "Permissions",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "userId",
            "description": "<p>The user id</p>"
          },
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "permission",
            "description": "<p>The permission id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Bool",
            "optional": false,
            "field": "bool",
            "description": "<p>The permission existence</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-response:",
          "content": "HTTP/1.1 200 OK\n\ntrue/false",
          "type": "bool"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/permissions_routes.js",
    "groupTitle": "Permissions",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Database error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnprocessableEntityError",
            "description": "<p>The data format isn't correct</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"errors\": [\n        {\n            \"status\": 500,\n            \"title\": \"Internal Server Error\",\n            \"description: \"description\"\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Error - Response:",
          "content": "\n{\n     \"errors\": [\n         {\n             \"status\": 422,\n             \"title\": \"Unprocessable Entity\",\n             \"value\": \"Invalid value\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/Permission/HasPermission/:userId?value=:permissionValue",
    "title": "Check if the user has permission using the value",
    "name": "hasPermissionByValue",
    "group": "Permissions",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "userId",
            "description": "<p>The user id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "permissionValue",
            "description": "<p>The permission value</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-response:",
          "content": "HTTP/1.1 200 OK\n\n true/false",
          "type": "bool"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/permissions_routes.js",
    "groupTitle": "Permissions",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Database error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnprocessableEntityError",
            "description": "<p>The data format isn't correct</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"errors\": [\n        {\n            \"status\": 500,\n            \"title\": \"Internal Server Error\",\n            \"description: \"description\"\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Error - Response:",
          "content": "\n{\n     \"errors\": [\n         {\n             \"status\": 422,\n             \"title\": \"Unprocessable Entity\",\n             \"value\": \"Invalid value\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/Permission/:permissionId",
    "title": "Remove the permission",
    "name": "removePermission",
    "group": "Permissions",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "permissionId",
            "description": "<p>Permission id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>The result object</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.state",
            "description": "<p>The result state</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.description",
            "description": "<p>The result description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n\n   {\n      \"result\": {\n          \"state\": 5,\n          \"description\": \"Removido com sucesso!\"\n      }\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/permissions_routes.js",
    "groupTitle": "Permissions",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Database error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnprocessableEntityError",
            "description": "<p>The data format isn't correct</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"errors\": [\n        {\n            \"status\": 500,\n            \"title\": \"Internal Server Error\",\n            \"description: \"description\"\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Error - Response:",
          "content": "\n{\n     \"errors\": [\n         {\n             \"status\": 422,\n             \"title\": \"Unprocessable Entity\",\n             \"value\": \"Invalid value\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/Role/:roleId/Permission",
    "title": "Add a permission to a role",
    "name": "addPermissionToRole",
    "group": "Role",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "roleId",
            "description": "<p>The role id</p>"
          },
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "PermissionId",
            "description": "<p>The permission id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "HTTP/1.1 200 OK\n\n  {\n      \"PermissionId\": UUID\n  }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>The result object</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.state",
            "description": "<p>The result state</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.description",
            "description": "<p>The result description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n  {\n      \"result\": {\n          \"state\": 5,\n          \"description\": \"Adicionado com sucesso!\"\n      }\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/roles_routes.js",
    "groupTitle": "Role",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Database error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnprocessableEntityError",
            "description": "<p>The data format isn't correct</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"errors\": [\n        {\n            \"status\": 500,\n            \"title\": \"Internal Server Error\",\n            \"description: \"description\"\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Error - Response:",
          "content": "\n{\n     \"errors\": [\n         {\n             \"status\": 422,\n             \"title\": \"Unprocessable Entity\",\n             \"value\": \"Invalid value\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/Role",
    "title": "Add a role",
    "name": "addRole",
    "group": "Role",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Name",
            "description": "<p>The role name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Description",
            "description": "<p>The role description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "HTTP/1.1 200 OK\n\n  {\n       \"Name\": string,\n       \"Description\": string\n  }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>The result object</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.state",
            "description": "<p>The result state</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.description",
            "description": "<p>The result description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n   {\n      \"result\": {\n          \"state\": 5,\n          \"description\": \"Adicionado com sucesso!\"\n      }\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/roles_routes.js",
    "groupTitle": "Role"
  },
  {
    "type": "get",
    "url": "/Role/:roleId/Permission",
    "title": "Get the roles from this permission",
    "name": "getPermissionsFromRole",
    "group": "Role",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "roleId",
            "description": "<p>The role id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "list",
            "description": "<p>The permissions list</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "object",
            "description": "<p>The permission object</p>"
          },
          {
            "group": "Success 200",
            "type": "UUID",
            "optional": false,
            "field": "ID",
            "description": "<p>The role id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Name",
            "description": "<p>The permission name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Description",
            "description": "<p>The permission description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n  [\n      {\n          \"ID\": \"89c34003-d9b8-4579-ac92-c7a5740cf6fb\",\n          \"Name\": null,\n          \"Description\": null,\n          \"Type\": 1,\n          \"Value\": null\n      }\n  ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/permissions_routes.js",
    "groupTitle": "Role"
  },
  {
    "type": "get",
    "url": "/Role",
    "title": "Get all the roles",
    "name": "getRoles",
    "group": "Role",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "roles",
            "description": "<p>The roles list</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>The role id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Name",
            "description": "<p>The role name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Description",
            "description": "<p>The result description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n  [\n      {\n          \"ID\": \"a544261a-7167-44af-83a3-f0f6d7859981\",\n          \"Name\": \"string\",\n          \"Description\": \"string\"\n      }\n  ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/roles_routes.js",
    "groupTitle": "Role"
  },
  {
    "type": "get",
    "url": "/Role/User/:userId",
    "title": "Get all the roles of the specified user",
    "name": "getUserRoles",
    "group": "Role",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "userId",
            "description": "<p>The user identifier</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "list",
            "description": "<p>The roles list</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Object",
            "description": "<p>The role object</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Object.ID",
            "description": "<p>The role id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Object.Name",
            "description": "<p>The role name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Object.Description",
            "description": "<p>The role description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n  [\n      {\n          \"ID\": \"a744261a-7167-44af-83a3-f0f6d7859981\",\n          \"Name\": null,\n          \"Description\": null\n      },\n      {\n          \"ID\": \"af148b6c-91f3-43f0-86bf-a50b0c867cbe\",\n          \"Name\": \"string\",\n          \"Description\": \"string\"\n      }\n  ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/roles_routes.js",
    "groupTitle": "Role",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Database error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnprocessableEntityError",
            "description": "<p>The data format isn't correct</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"errors\": [\n        {\n            \"status\": 500,\n            \"title\": \"Internal Server Error\",\n            \"description: \"description\"\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Error - Response:",
          "content": "\n{\n     \"errors\": [\n         {\n             \"status\": 422,\n             \"title\": \"Unprocessable Entity\",\n             \"value\": \"Invalid value\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/Role/:roleId/Permission/:permissionId",
    "title": "Remove a permission from a role",
    "name": "removePermissionFromRole",
    "group": "Role",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "roleId",
            "description": "<p>The role id</p>"
          },
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "permissionId",
            "description": "<p>The permission id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>The result object</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.state",
            "description": "<p>The result state</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.description",
            "description": "<p>The result description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n  {\n      \"result\": {\n          \"state\": 5,\n          \"description\": \"Eliminado com sucesso!\"\n      }\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/roles_routes.js",
    "groupTitle": "Role",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Database error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnprocessableEntityError",
            "description": "<p>The data format isn't correct</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"errors\": [\n        {\n            \"status\": 500,\n            \"title\": \"Internal Server Error\",\n            \"description: \"description\"\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Error - Response:",
          "content": "\n{\n     \"errors\": [\n         {\n             \"status\": 422,\n             \"title\": \"Unprocessable Entity\",\n             \"value\": \"Invalid value\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/Role/:roleId",
    "title": "Remove role",
    "name": "removeRole",
    "group": "Role",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "roleId",
            "description": "<p>The role identifier</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>The result object</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.state",
            "description": "<p>The result state</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.description",
            "description": "<p>The result description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n   {\n      \"result\": {\n          \"state\": 5,\n          \"description\": \"Eliminado com sucesso!\"\n      }\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/roles_routes.js",
    "groupTitle": "Role",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnprocessableEntityError",
            "description": "<p>The data format isn't correct</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Database error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error - Response:",
          "content": "\n{\n     \"errors\": [\n         {\n             \"status\": 422,\n             \"title\": \"Unprocessable Entity\",\n             \"value\": \"Invalid value\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n    \"errors\": [\n        {\n            \"status\": 500,\n            \"title\": \"Internal Server Error\",\n            \"description: \"description\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/User",
    "title": "Add a user",
    "name": "addUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Name",
            "description": "<p>The user name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "UserName",
            "description": "<p>The username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Password",
            "description": "<p>The user password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Email",
            "description": "<p>The user email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"Name\": string,\n  \"UserName\": string,\n  \"Password\": string,\n  \"Email\": string\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>The result object</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.state",
            "description": "<p>The result state</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.description",
            "description": "<p>The result description</p>"
          },
          {
            "group": "Success 200",
            "type": "UUID",
            "optional": false,
            "field": "result.id",
            "description": "<p>The user id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n   {\n      \"result\": {\n          \"state\": 5,\n          \"description\": \"Adicionado com sucesso!\",\n          \"id\": \"uuid\"\n          \n      }\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/user_routes.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Database error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnprocessableEntityError",
            "description": "<p>The data format isn't correct</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"errors\": [\n        {\n            \"status\": 500,\n            \"title\": \"Internal Server Error\",\n            \"description: \"description\"\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Error - Response:",
          "content": "\n{\n     \"errors\": [\n         {\n             \"status\": 422,\n             \"title\": \"Unprocessable Entity\",\n             \"value\": \"Invalid value\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/User/:userId/Role",
    "title": "Add a role to the user",
    "name": "addUserRole",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "userId",
            "description": "<p>The user id</p>"
          },
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "RoleId",
            "description": "<p>The role id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"RoleId\": uuid,\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>Result object</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.state",
            "description": "<p>The result state</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.description",
            "description": "<p>The result description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n   {\n      \"result\": {\n          \"state\": 5,\n          \"description\": \"Adicionado com sucesso!\"\n      }\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/user_routes.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Database error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnprocessableEntityError",
            "description": "<p>The data format isn't correct</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"errors\": [\n        {\n            \"status\": 500,\n            \"title\": \"Internal Server Error\",\n            \"description: \"description\"\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Error - Response:",
          "content": "\n{\n     \"errors\": [\n         {\n             \"status\": 422,\n             \"title\": \"Unprocessable Entity\",\n             \"value\": \"Invalid value\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/User/:userId",
    "title": "Change the state of the user",
    "name": "changeUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "userId",
            "description": "<p>The user id</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "State",
            "description": "<p>The user new state</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Name",
            "description": "<p>The user new name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Email",
            "description": "<p>The user new email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Password",
            "description": "<p>The user new password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"State\": integer,\n  \"Name\": string,\n  \"Email\": string,\n  \"Password\": string\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>The result object</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.state",
            "description": "<p>The result state</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.description",
            "description": "<p>The result description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n   {\n      \"result\": {\n          \"state\": 5,\n          \"description\": \"Alterado com sucesso!\"\n      }\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/user_routes.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Database error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnprocessableEntityError",
            "description": "<p>The data format isn't correct</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"errors\": [\n        {\n            \"status\": 500,\n            \"title\": \"Internal Server Error\",\n            \"description: \"description\"\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Error - Response:",
          "content": "\n{\n     \"errors\": [\n         {\n             \"status\": 422,\n             \"title\": \"Unprocessable Entity\",\n             \"value\": \"Invalid value\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/User/:userId/Role/:roleId",
    "title": "Delete a role from a user",
    "name": "deleteUserRole",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "userId",
            "description": "<p>The user id</p>"
          },
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "roleId",
            "description": "<p>The role id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>The result object</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.state",
            "description": "<p>The result state</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.description",
            "description": "<p>The result description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n  {\n      \"result\": {\n          \"state\": 5,\n          \"description\": \"Removido com sucesso!\"\n      }\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/user_routes.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Database error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnprocessableEntityError",
            "description": "<p>The data format isn't correct</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"errors\": [\n        {\n            \"status\": 500,\n            \"title\": \"Internal Server Error\",\n            \"description: \"description\"\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Error - Response:",
          "content": "\n{\n     \"errors\": [\n         {\n             \"status\": 422,\n             \"title\": \"Unprocessable Entity\",\n             \"value\": \"Invalid value\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/User?:userId=id",
    "title": "Get the user by id",
    "name": "getUserByID",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "userId",
            "description": "<p>The user id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "UUID",
            "optional": false,
            "field": "ID",
            "description": "<p>The user id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Name",
            "description": "<p>The name of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Email",
            "description": "<p>The email of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "UserName",
            "description": "<p>The username</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Password",
            "description": "<p>The user hashed password</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "PasswordSalt",
            "description": "<p>The user password salt</p>"
          },
          {
            "group": "Success 200",
            "type": "TimeStamp",
            "optional": false,
            "field": "CreationDate",
            "description": "<p>This user creation date.This is a timestamp without timezone</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "State",
            "description": "<p>The user current state</p>"
          },
          {
            "group": "Success 200",
            "type": "TimeStamp",
            "optional": false,
            "field": "LastConnection",
            "description": "<p>This user last connection date. This is a timestamp without timezone</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n {\n      \"ID\": \"a544261a-7167-44af-83a3-f0f6d7859981\",\n      \"Name\": \"string\",\n      \"Email\": null,\n      \"UserName\": null,\n      \"Password\": null,\n      \"PasswordSalt\": null,\n      \"CreationDate\": \"2004-10-19T09:23:54.000Z\",\n      \"State\": 3,\n      \"LastConnection\": \"2004-10-19T09:23:54.000Z\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/user_routes.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Database error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnprocessableEntityError",
            "description": "<p>The data format isn't correct</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"errors\": [\n        {\n            \"status\": 500,\n            \"title\": \"Internal Server Error\",\n            \"description: \"description\"\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Error - Response:",
          "content": "\n{\n     \"errors\": [\n         {\n             \"status\": 422,\n             \"title\": \"Unprocessable Entity\",\n             \"value\": \"Invalid value\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/User?:username=username",
    "title": "Get the user by username",
    "name": "getUserByUsername",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "userId",
            "description": "<p>The user id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "UUID",
            "optional": false,
            "field": "ID",
            "description": "<p>The user id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Nme",
            "description": "<p>The name of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Email",
            "description": "<p>The email of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "UserName",
            "description": "<p>The username</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Password",
            "description": "<p>The user hashed password</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "PasswordSalt",
            "description": "<p>The user password salt</p>"
          },
          {
            "group": "Success 200",
            "type": "TimeStamp",
            "optional": false,
            "field": "CreationDate",
            "description": "<p>This user creation date.This is a timestamp without timezone</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "State",
            "description": "<p>The user current state</p>"
          },
          {
            "group": "Success 200",
            "type": "TimeStamp",
            "optional": false,
            "field": "LastConnection",
            "description": "<p>This user last connection date. This is a timestamp without timezone</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n {\n      \"ID\": \"a544261a-7167-44af-83a3-f0f6d7859981\",\n      \"Name\": \"string\",\n      \"Email\": null,\n      \"UserName\": null,\n      \"Password\": null,\n      \"PasswordSalt\": null,\n      \"CreationDate\": \"2004-10-19T09:23:54.000Z\",\n      \"State\": 3,\n      \"LastConnection\": \"2004-10-19T09:23:54.000Z\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/user_routes.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Database error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnprocessableEntityError",
            "description": "<p>The data format isn't correct</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"errors\": [\n        {\n            \"status\": 500,\n            \"title\": \"Internal Server Error\",\n            \"description: \"description\"\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Error - Response:",
          "content": "\n{\n     \"errors\": [\n         {\n             \"status\": 422,\n             \"title\": \"Unprocessable Entity\",\n             \"value\": \"Invalid value\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/User",
    "title": "Get all the users",
    "name": "getUsers",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "UUID",
            "optional": false,
            "field": "ID",
            "description": "<p>The user id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Name",
            "description": "<p>The name of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Email",
            "description": "<p>The email of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "UserName",
            "description": "<p>The username</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Password",
            "description": "<p>The hashed password</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "PasswordSalt",
            "description": "<p>The password salt</p>"
          },
          {
            "group": "Success 200",
            "type": "TimeStamp",
            "optional": false,
            "field": "CreationDate",
            "description": "<p>The user creation date. This is a timestamp without timezone</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "State",
            "description": "<p>The user current state</p>"
          },
          {
            "group": "Success 200",
            "type": "TimeStamp",
            "optional": false,
            "field": "LastConnection",
            "description": "<p>The user last connection date. This is a timestamp without timezone</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n\n[\n    {\n        \"ID\": \"a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11\",\n        \"Name\": \"string\",\n        \"Email\": \"string\",\n        \"UserName\": \"string\",\n        \"Password\": \"string\",\n        \"PasswordSalt\": \"ew\",\n        \"CreationDate\": \"2004-10-19T09:23:54.000Z\",\n        \"State\": 1,\n        \"LastConnection\": \"2004-10-19T09:23:54.000Z\"\n     }\n]",
          "type": "list"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/user_routes.js",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/User/:userId",
    "title": "Delete a user",
    "name": "removeUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "userId",
            "description": "<p>The user id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>The result object</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result.state",
            "description": "<p>The result state</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.description",
            "description": "<p>The result description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n  {\n      \"result\": {\n          \"state\": 5,\n          \"description\": \"Removido com sucesso!\"\n      }\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/user_routes.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Database error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnprocessableEntityError",
            "description": "<p>The data format isn't correct</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"errors\": [\n        {\n            \"status\": 500,\n            \"title\": \"Internal Server Error\",\n            \"description: \"description\"\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Error - Response:",
          "content": "\n{\n     \"errors\": [\n         {\n             \"status\": 422,\n             \"title\": \"Unprocessable Entity\",\n             \"value\": \"Invalid value\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    }
  }
] });
