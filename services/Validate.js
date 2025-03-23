class Validate {
    #validContentType = process.env.ACCEPT;
    #validSecretKey = process.env.SECRET_KEY;
    #validationRules;

    constructor(validationRules) {
        this.#validationRules = validationRules;
    }
    
    dataValidator() {
        // Check content type first
        if (!this.#validationRules.accept.value || this.#validationRules.accept.value !== this.#validContentType) {
            return {
                success: false,
                message: 'Invalid header sent.'
            };
        }

        // Check for secret key
        if (!this.#validationRules.secretKey.value || this.#validationRules.secretKey.value !== this.#validSecretKey) {
            return {
                success: false,
                message: 'Invalid secret key sent.'
            };
        }

        // Iterate through the validation rules and check if any are missing
        const invalidFields = Object.entries(this.#validationRules)
            .filter(([_, rule]) => rule.required && !rule.value)
            .map(([field, _]) => `${field} is required`)
            .join(', ');

        return {
            success: invalidFields.length === 0,
            message: invalidFields || "Validation successful"
        };
    }
}

export default Validate;
