exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://andycbush:mortar39@ds033103.mlab.com:33103/thinkful-shopping-list-node' :
                            'mongodb://localhost/shopping-list-dev');
exports.PORT = process.env.PORT || 8080;