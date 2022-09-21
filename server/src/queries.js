const addData =
  "INSERT INTO  ordertable(name,email,address,phone,website,invoicedate,invoicenumber,clientname,gst,igst,cgst,tax,taxc,subtotal,total) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,$13,$14,$15) RETURNING order_id ";

const addData2 ="INSERT INTO orderdetails(description,quantity,price,amount,order_id) VALUES ($1,$2,$3,$4,$5)";
  
const getordertable = "SELECT * FROM ordertable ORDER BY order_id DESC ";
const getCompanydetails = "SELECT * FROM companydetail ";
const getorderitems =
  "SELECT * FROM orderdetails ORDER BY orderdetails_id DESC ";

const itemlist = "SELECT * FROM orderdetails where order_id = $1";
const getorderbyid = "SELECT * FROM ordertable WHERE order_id = $1";

const getorderbydates =
   "SELECT * FROM ordertable  WHERE invoicedate between $1 and $2 ";

const WorkOrder =
  "SELECT * FROM  ordertable,orderdetails  WHERE ordertable.order_id = orderdetails.order_id order by ordertable.order_id desc Limit 1";
// const WorkOrder =
//   "SELECT * FROM  ordertable,orderdetails  WHERE (ordertable.order_id = orderdetails.order_id) = $1";

// const itemlist =
//   "SELECT * FROM orderdetails where order_id = (select max(order_id) from orderdetails)";

  const deleteordertable = "DELETE FROM  ordertable WHERE order_id = $1";
  const deleteorderdetails = "DELETE FROM  orderdetails WHERE order_id = $1";

  const updateOrder =
    "UPDATE ordertable SET name =$1,address = $2,website=$3,clientname = $4,email = $5,phone =$6,invoicedate=$7,invoicenumber=$8, gst =$9 ,igst=$10,cgst=$11,tax=$12,taxc=$13,subtotal=$14,total=$15 WHERE order_id = $16";
  
  const updateOrderdetails =
  "UPDATE orderdetails SET  description = $1,quantity =$2,price =$3,igst =$4,cgst =$5,amount =$4 WHERE order_id = $5";
// const updateOrderdetails =
//   "INSERT INTO orderdetails (orderdetails_id,description,quantity,price,amount) VALUES ($1,$2,$3,$4,$5) ON   DUPLICATE KEY  UPDATE description=$1,quantity=$2,price=$3,amount=$4";

// orderdetails (order_id,description,quantity,price,amount) VALUES ((select order_id from inserted_id),$9,$10,$11,$12)";
//orderdata (order_id,list) VALUES ((select order_id from inserted_id),$9)";

module.exports = {
  getordertable,
  getCompanydetails,
  getorderitems,
  WorkOrder,
  itemlist,
  getorderbyid,
  getorderbydates,
  deleteordertable,
  deleteorderdetails,
  updateOrder,
  updateOrderdetails,
  addData,
  addData2,
};
