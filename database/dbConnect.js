const mongoose = require("mongoose");

const DATABASE = "shopping-cart";
const uri =
  process.env.NODE_ENV === "production"
    ? process.env.MONGODB_URI
    : "mongodb://localhost:27017/" + DATABASE;

exports.dbConnector = () => {
  if (!mongoose.connection.readyState) {
    mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then(() => console.log(`DB is running`.yellow))
      .catch((error) => console.log(error));
  }
};
