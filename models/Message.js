import Validate from '../services/Validate.js';
import MessageRule from '../rules/MessageRule.js';

class Message {
    constructor(headers, body) {
        this.message = body.message;
        this.roomId = body.roomId;
        this.secretKey = body.secretKey;
        this.accept = headers.accept;
    }

    validate() {
        const validationRules = MessageRule.getRules(this);
        const validator = new Validate(validationRules);
        const validationResult = validator.dataValidator();
        
        return {
            success: validationResult.success,
            message: validationResult.success ? "Message sent successfully" : validationResult.message
        };
    }
}

export default Message; 