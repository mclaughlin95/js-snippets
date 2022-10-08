'use strict'

/**
 * A class used to represent a singleton in a JavaScript. This class
 * cannot be extended like a traditional singleton, but the logic 
 * within must be implemented independently within a targeted class.
 * 
 * Note: 
 * - The new() operator cannot be used to instantiate the class object
 * - An id property is generated to identify its uniqueness 
 * 
 * Author: Corey Lee McLaughlin
 */
class Singleton {
    
    /**
     * The constructor will generated a random number to identify as a unique
     * identifier. This unique identifier is used to compare against another
     * instantiated class object to compare its uniqueness
     */
    constructor() {
        this.id = Math.random();
    }

    /**
     * Instantiates a new Singleton class object, but will also return the 
     * existing class object if it's already instantiated.
     *  
     * Author: Corey Lee McLaughlin
     * 
     * @returns { Singleton } 
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }

}

module.exports = Singleton;