import id from 'shortid';

function generar_id(): String{
    return id.generate();
}

module.exports = {
    generar_id
}