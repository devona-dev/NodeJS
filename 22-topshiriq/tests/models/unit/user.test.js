const { User } = require('../../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');

describe('user.generateAuthToken', ()=> {
    it('agar jwt bolsa korsatadi', ()=>{
        const user = new User({ isAdmin: true });
        const token = user.generateAuthToken();
        const decodedObject = jwt.verify(token, config.get('jwtPrivateKey'));
        expect(decodedObject).toMatchObject( {isAdmin: true} );
    })
})