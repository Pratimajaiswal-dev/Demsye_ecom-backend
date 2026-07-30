const sql = require("mssql/msnodesqlv8");

const config = {
    connectionString:
        "Driver={ODBC Driver 18 for SQL Server};Server=DESKTOP-106BI1J;Database=DemsyeEcommerce;Trusted_Connection=Yes;TrustServerCertificate=Yes;"
};

async function connectDB() {
    try {
        const pool = await sql.connect(config);

        console.log("✅ SQL Server Connected Successfully");

        const result = await pool.request().query("SELECT DB_NAME() AS DatabaseName");

        console.log(result.recordset);

    } catch (err) {
        console.error(err);
    }
}

module.exports = { sql, connectDB };