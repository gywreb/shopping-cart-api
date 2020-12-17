const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/";
const DATABASE = "shopping-cart";

exports.dbConnector = () => {
  if (!mongoose.connection.readyState) {
    mongoose
      .connect(uri + DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then(() => console.log(`DB is running`.yellow))
      .catch((error) => console.log(error));
  }
};
