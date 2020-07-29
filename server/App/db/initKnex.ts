import knex from "knex";

export default knex({
    client: "pg",
    connection: {
        host: "127.0.0.1",
        user: process.env.DB_DEV_USER,
        password: process.env.DB_DEV_PASSWORD,
        database: "activity_tracker"
    }
});
