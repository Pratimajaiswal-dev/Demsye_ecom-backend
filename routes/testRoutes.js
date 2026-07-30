const express = require("express");
const router = express.Router();
const { sql } = require("../config/db");

router.get("/test-db", async (req, res) => {
    try {
        const result = await sql.query("SELECT GETDATE() AS CurrentDate");

        res.status(200).json({
            success: true,
            message: "Database Connected Successfully",
            data: result.recordset
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;