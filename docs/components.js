module.exports = {
    components: {
        schemas: {
            user: {
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
                    },
                    role: {
                        type: 'String',
                        description: 'User or admin',
                        example: 'user'
                    },
                    postIds: {
                        type: 'ObjectId',
                        description: 'ref: posts',
                        example: '12345678'
                    },
                    favourites: {
                        type: 'ObjectId',
                        description: 'ref: posts',
                        example: '12345678'
                    },
                    followers: {
                        type: 'ObjectId',
                        description: 'ref: User',
                        example: '12345678'
                    },
                    following: {
                        type: 'ObjectId',
                        description: 'ref: User',
                        example: '12345678'
                    },
                    image_path: {
                        type: 'String',
                        description: 'url link to image',
                        example: 'imagefile.png'
                    }
                }
           
            },
             userInput: {
                type: 'object',
                properties: {
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
                   
                }

            },
            UpdateUser: {
                type: 'objectId',
                description: "An id of a user",
                example: "6201064b0028de7866e2b2c4"
            },
        }
    }
}