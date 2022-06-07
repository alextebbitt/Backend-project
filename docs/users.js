module.exports = {
    paths: {
        "/users": {
            get: {
                tags: {
                    Users: "Get",
                },
                description: "Get users",
                operationId: "getUsers",
                parameters: [],
                responses: {
                    200: {
                        description: "Users were obtained",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/user",
                                },
                            },
                        },
                    },
                },
            },
            post: {
                tags: {
                    Tasks: "Create a user",
                },
                description: "Create User",
                operationId: "createUser",
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/userInput",
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "User created successfully",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
            put: {
                put: {
                    tags: {
                        Tasks: "Update a user",
                    },
                    description: "Update User",
                    operationId: "updateUser",
                    parameters: [
                        {
                            name: "_id",
                            in: "path",
                            schema: {
                                $ref: "#/components/schemas/UpdateUser",
                            },
                            description: "Id of User to be updated",
                        },
                    ],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/UpdateUser" },
                            },
                        },
                    },
                    responses: {
                        200: { description: "User updated successfully" },
                        404: { description: "User not found" },
                        500: { description: "Server error" },
                    },
                },
            },
        },
    },
};