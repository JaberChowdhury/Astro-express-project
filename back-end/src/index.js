const app = require("./app.js");
const { SERVER_PORT } = require("./secret.js");

app.listen(SERVER_PORT, () => {
  // console.log("-------------------------------------")
  console.log(`App running at http://localhost:${SERVER_PORT}`);
  console.log("-------------------------------------");
});
