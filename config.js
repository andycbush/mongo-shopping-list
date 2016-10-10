exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://localhost/mongo-shopping-list' :
                            'mongodb://localhost/mongo-shopping-list');
exports.PORT = process.env.PORT || 8080;