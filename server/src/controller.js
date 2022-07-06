const pool = require("../db");
const queries = require("./queries");

//getordertable data
const getordertable = (req, res) => {
  pool.query(queries.getordertable, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

//getCompanyDetails table data
const getcomanydetail = (req, res) => {
  pool.query(queries.getCompanydetails, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

//getorderbyid
const getorderbyid = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await pool.query(queries.getorderbyid, [id]);
    res.json(order.rows[0]);
  } catch (err) {
    console.log(err);
  }
};
const getorderbydates = async (req, res) => {
  try {
    const { start, end } = req.params;
    const order = await pool.query(queries.getorderbydates, [start, end]);
    res.status(200).json(order.rows);
  } catch (err) {
    console.log(err);
  }
};

//get Items list
const itemlist = async (req, res) => {
  try {
    const { id } = req.params;
    const items = await pool.query(queries.itemlist, [id]);
    res.status(200).json(items.rows);
  } catch (err) {
    console.log(err);
  }
};

//UPDATE ORDER
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    address,
    website,
    clientname,
    email,
    phone,
    invoicedate,
    invoicenumber,
    gst,
    igst,
    cgst,
    tax,
    taxc,
    subtotal,
    total,
    list,
  } = req.body;
  pool.query(queries.deleteorderdetails, [id], (error, results) => {
    if (error) throw error;
    res.status(204).send("Order Deleted !");
    // deletedorderid = results.rows[0].order_id;
    // console.log(deletedorderid);
  });
  pool.query(
    queries.updateOrder,
    [
      name,
      address,
      website,
      clientname,
      email,
      phone,
      invoicedate,
      invoicenumber,
      gst,
      igst,
      cgst,
      tax,
      taxc,
      subtotal,
      total,
      id,
    ],
    (error, results) => {
      // if (error) throw error;
      // console.log("Rows" + JSON.stringify(results.rows));
      //res.status(204).send("Order Updated !");

      for (var i = 0; i < list.length; i++) {
        pool.query(
          queries.addData2,
          [
            list[i].description,
            list[i].quantity,
            list[i].price,
            list[i].amount,
            id,
          ],
          (error, results) => {
            if (error) {
              throw error;
              console.log(error);
            } else {
              //  res.status(201).send("Data added successful !");
              console.log("Rows" + JSON.stringify(results.rows));
            }
          }
        );
      }
    }
  );
};

//DELETE ORDER BY ID
const deleteorder = (req, res) => {
  const { id } = req.params;
  pool.query(queries.deleteorderdetails, [id], (error, results) => {
    // if (error) throw error;
    //  res.status(204).send("Order Deleted !");
    pool.query(queries.deleteordertable, [id], (error, results) => {
      if (error) throw error;
      res.status(204).send("Order Deleted !");
      // deletedorderid = results.rows[0].order_id;
      // console.log(deletedorderid);
    });
  });
};

//getorderItems data
const getorderitems = (req, res) => {
  pool.query(queries.getorderitems, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

//getorder+Items data
const getworkorder = (req, res) => {
  pool.query(queries.WorkOrder, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

// Add Data
const addData = (req, res) => {
  const {
    name,
    email,
    address,
    website,
    phone,
    invoicedate,
    invoicenumber,
    clientname,
    gst,
    igst,
    cgst,
    tax,
    taxc,
    subtotal,
    total,
    list,
  } = req.body;
  // var neworderid = null;
  pool.query(
    queries.addData,
    [
      name,
      email,
      address,
      phone,
      website,
      invoicedate,
      invoicenumber,
      clientname,
      gst,
      igst,
      cgst,
      tax,
      taxc,
      subtotal,
      total,
    ],

    (error, results) => {
      console.log(results);
      if (error) throw error;
      res.status(201).send("Data added successful !");
      neworderid = results.rows[0].order_id;
      console.log(neworderid);

      for (var i = 0; i < list.length; i++) {
        pool.query(
          queries.addData2,
          [
            list[i].description,
            list[i].quantity,
            list[i].price,
            list[i].amount,
            neworderid,
          ],
          (error, results) => {
            if (error) {
              throw error;
              console.log(error);
            } else {
              //  res.status(201).send("Data added successful !");
              console.log("Rows" + JSON.stringify(results.rows));
            }
          }
        );
      }
      return neworderid;
    }
    //console.log(newlyCreatedOrderId),
  );
};

module.exports = {
  getordertable,
  getcomanydetail,
  getorderitems,
  itemlist,
  getworkorder,
  addData,
  getorderbyid,
  getorderbydates,
  deleteorder,
  updateOrder,

  // addData2,
};
