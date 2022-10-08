const Singleton = require('../src/singleton.js');

describe('Singleton', () => {
    
    it('getInstance()', () => {
        let a = Singleton.getInstance();
        expect(a.constructor.name).toEqual('Singleton');
        let b = Singleton.getInstance();
        expect(a.id).toEqual(b.id);
    });

});

