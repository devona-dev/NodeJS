const config = require('config');

module.exports = function () {
    if(!config.get('jwtPrivateKey')){
        throw new Error("JIDDIY XATOLIK: virtualdars_jwtPrivateKey muhit ozgaruvchisi aniqlanmadi...");
    }
    
}