'use strict'

export default class Singleton {
    
    constructor(name) {
        this.name = name;
    }

    static getInstance(name) {
        if (!this.instance) {
            this.instance = new this(name);
        }
        return this.instance;    
    }

}