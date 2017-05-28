module.exports = function(request, response, next){
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
    response.header('Access-Control-Allow-Headers', 'Origins, X-Requested-Width, Content-Type, Accept');
    next();
}