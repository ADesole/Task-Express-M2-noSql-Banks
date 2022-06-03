let accounts = require("./accounts");
const connectDb = require("./database");
const express = require("express");
const app = express();
const accountsRoutes = require("./api/accounts/accounts.routes");

app.use(express.json());
app.use("/accounts", accountsRoutes);
connectDb();
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
