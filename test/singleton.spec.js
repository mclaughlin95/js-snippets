import Singleton from '../src/singleton.js';

describe('Singleton', () => {
    
    it('getInstance()', () => {
        let a = Singleton.getInstance('foo');
        expect(a.constructor.name).toEqual('Singleton');
        expect(a.name).toEqual('foo');
        let b = Singleton.getInstance('bar');
        expect(b.name).toEqual('foo');
    });

});

