module.exports = {
    components: {
        schemas: {
            task: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'objectId',
                        description: "user identification number",
                        example: "6201064b0028de7866e2b2c4"
                    },
                    name: {
                        type: 'string',
                        description: "user name",
                        example: "John"
                    },
                    email: {
                        type: 'string',
                        description: "user email",
                        example: "John@gmail.com"
                    },
                    password: {
                        type: 'string',
                        description: "user password",
                        example: "12345"
                    },
                    confirmed: {
                        type: "boolean",
                        description: "If user has confirmed email",
                        example: false
                    }
                }
            }
        }
    }
}