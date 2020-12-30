const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { ConnectMongo } = require("./database/dbConnect");
const app = express();
const auth = require("./routes/auth");
const role = require("./routes/role");
const category = require("./routes/category");
const user = require("./routes/user");
const product = require("./routes/product");
const upload = require("./routes/upload");
const { errorHandler } = require("./middleware/errorHandler");

ConnectMongo.getConnect();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use("/api/v1/auth", auth);
app.use("/api/v1/role", role);
app.use("/api/v1/category", category);
app.use("/api/v1/user", user);
app.use("/api/v1/product", product);
app.use("/api/v1/upload", upload);

app.use(errorHandler);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is running on port: ${port}`.cyan));
