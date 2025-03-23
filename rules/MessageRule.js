class MessageRule {
    static getRules(message) {
        return {
            accept: { 
                value: message.accept, 
                required: true
            },
            
            secretKey: { 
                value: message.secretKey, 
                required: true
            },

            message: { 
                value: message.message, 
                required: true
            },

            roomId: { value: message.roomId, 
                required: true
            },
        };
    }
}

export default MessageRule; 