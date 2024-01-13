const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

module.exports = {
  "development": {
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.HOST,
    "dialect": process.env.DB_DIALECT,
    "port": process.env.DB_PORT
  },
  
  "production": {
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.HOST,
    "dialect": process.env.DB_DIALECT,
    "port": process.env.DB_PORT
  }

  // {
  //   "development": {
  //     "username": "sisges27_elhadjd73",
  //     "password": "ElhadjKalil",
  //     "database": "sisges27_sigesc",
  //     "host": "162.241.2.220",
  //     "dialect": "mysql",
  //     "port": 3306
  //   },
    
  //   "production": {
  //     "username": "sisges27_elhadjd73",
  //     "password": "ElhadjKalil",
  //     "database": "sisges27_sigesc",
  //     "host": "162.241.2.220",
  //     "dialect": "mysql",
  //     "port": 3306
  //   }
  // }
}
