exports.DATABASE_URL =
  process.env.DATABASE_URL ||
  global.DATABASE_URL ||
  "mongodb://cre8visionsllc:adminpassword@payrolldeduction-shard-00-00-pkxd7.mongodb.net:27017,payrolldeduction-shard-00-01-pkxd7.mongodb.net:27017,payrolldeduction-shard-00-02-pkxd7.mongodb.net:27017/justlaunch?ssl=true&replicaSet=payrolldeduction-shard-0&authSource=admin&retryWrites=true";

exports.PORT = process.env.PORT || 8080;
