const express = require("express");
const apiRoutes = require("./routes/API-routes");
const htmlRoutes = require("./routes/HTML-routes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(apiRoutes);
app.use(htmlRoutes);

app.listen(PORT, () =>
  console.log(`Server is listening on http://localhost:${PORT}`)
);
