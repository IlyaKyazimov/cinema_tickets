module.exports = {
    HOST: process.env.DB_HOST || 'localhost',
    USER: process.env.DB_USER || 'root',
    PASSWORD: process.env.DB_PASSWORD || "11235813",
    DB: process.env.DB_NAME || "cinema_tickets",
    PORT: process.env.DB_PORT || 3306,
    dialect: "mysql"
  };
