const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGO_DB_URL, {
        dbName: "Social-Media-App-ABES",
    })
    .then(() => {
        console.log("------ ✅ DB Connected -----");
    })
    .catch((err) => {
        console.log("------ ❌ DB Connection Error -----");
        console.log(err.message);
        console.log("-----------------------------------");
    });

// No-sql --> ODM  --> mongoose
// SQL --> ORM --> prisma, drizzle
