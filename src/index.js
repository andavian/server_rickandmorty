const server = require("./app");
const { conn } = require("./DB_connection");

const PORT = 10001;

conn
  .sync({ force: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
