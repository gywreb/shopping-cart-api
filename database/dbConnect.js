const mongoose = require("mongoose");

exports.ConnectMongo = class ConnectMongo {
  constructor() {
    this.gfs = null;
  }
  static getConnect() {
    mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then(() => console.log(`DB is connected`.yellow));

    const conn = mongoose.connection;

    conn.once("open", () => {
      this.gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: process.env.MONGO_BUCKET,
      });
    });
  }
};

// exports.dbConnector = () => {
//   if (!mongoose.connection.readyState) {
//     const connect = mongoose
//       .createConnect(uri, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false,
//       })
//       .then(() => console.log(`DB is running`.yellow))
//       .catch((error) => console.log(error));
//   }
// };
