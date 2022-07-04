const express = require("express");
const cors = require("cors");
const billDataRoutes = require("./src/routes");
const pool = require("./db");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from the backend");
});



app.use("/api/v1/billingdata",  billDataRoutes);
app.use("/api/v1/billingdata/items", billDataRoutes);
app.use("/api/v1/billingdata/companydetail", billDataRoutes);
app.use("/api/v1/billingdata/orderitems", billDataRoutes);
app.use("/api/v1/billingdata/itemlist/:id", billDataRoutes);
app.use("/api/v1/billingdata/:id", billDataRoutes);
app.use("/api/v1/billingdata/getoderbyid/:id", billDataRoutes);
app.use("/api/v1/billingdata/getoderbydates/:dates", billDataRoutes);
app.use("/api/v1/billingdata/updateorder/:id", billDataRoutes);



if (pool) {
  console.log("connection successful");
} else {
  console.log("Error");
}

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
