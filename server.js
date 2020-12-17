const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { dbConnector } = require("./database/dbConnect");
const app = express();
const auth = require("./routes/auth");
const role = require("./routes/role");
const category = require("./routes/category");
const user = require("./routes/user");
const { errorHandler } = require("./middleware/errorHandler");

dbConnector();

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/v1/auth", auth);
app.use("/api/v1/role", role);
app.use("/api/v1/category", category);
app.use("/api/v1/user", user);
app.use(errorHandler);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is running on port: ${port}`.cyan));
