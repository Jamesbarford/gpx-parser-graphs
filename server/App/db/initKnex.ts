import knex from "knex";

export default knex({
    client: "pg",
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: parseFloat(process.env.DB_PORT || "")
    },
    pool: {
        max: 5,
        min: 2
    }
});
