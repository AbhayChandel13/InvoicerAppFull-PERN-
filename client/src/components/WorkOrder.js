import React, { useState, useEffect ,forwardRef} from "react";
import Headerdata from "./Headerdata";
import MainDetails from "./MainDetails";
import ClientDetails from "./ClientDetails";
import Dates from "./Dates";
import Header from "./../Header/Header";
import Footer from "./Footer";


const WorkOrder = (prop,ref) => {


 const total = "";
  function intToEnglish(number) {
    var NS = [
      { value: 10000000, str: "Crore" },
      { value: 100000, str: "Lakh" },
      { value: 1000, str: "Thousand" },
      { value: 100, str: "Hundred" },
      { value: 90, str: "Ninety" },
      { value: 80, str: "Eighty" },
      { value: 70, str: "Seventy" },
      { value: 60, str: "Sixty" },
      { value: 50, str: "Fifty" },
      { value: 40, str: "Forty" },
      { value: 30, str: "Thirty" },
      { value: 20, str: "Twenty" },
      { value: 19, str: "Nineteen" },
      { value: 18, str: "Eighteen" },
      { value: 17, str: "Seventeen" },
      { value: 16, str: "Sixteen" },
      { value: 15, str: "Fifteen" },
      { value: 14, str: "Fourteen" },
      { value: 13, str: "Thirteen" },
      { value: 12, str: "Twelve" },
      { value: 11, str: "Eleven" },
      { value: 10, str: "Ten" },
      { value: 9, str: "Nine" },
      { value: 8, str: "Eight" },
      { value: 7, str: "Seven" },
      { value: 6, str: "Six" },
      { value: 5, str: "Five" },
      { value: 4, str: "Four" },
      { value: 3, str: "Three" },
      { value: 2, str: "Two" },
      { value: 1, str: "One" },
    ];

    var result = "";
    for (var n of NS) {
      if (number >= n.value) {
        if (number <= 99) {
          result += n.str;
          number -= n.value;
          if (number > 0) result += " ";
        } else {
          var t = Math.floor(number / n.value);
          // console.log(t);
          var d = number % n.value;
          if (d > 0) {
            return intToEnglish(t) + " " + n.str + " " + intToEnglish(d);
          } else {
            return intToEnglish(t) + " " + n.str;
          }
        }
      }
    }
    return result;
  }

  console.log(intToEnglish(total));


  let [workorder, setWorkOrder] = useState([]);
  let [itemslist, setItemslist] = useState([]);
 
    

  const getWorkOrder = async () => {

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/billingdata/orderitems"
      );
      const jsonData = await response.json();
     
      setWorkOrder(jsonData);
      var orderId =(jsonData[0].order_id);
      
    } catch (err) {
      console.error(err.message);
    }
   
    console.log(orderId);
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/billingdata/itemlist/${orderId}`
      );
      const jsonData = await response.json();

      setItemslist(jsonData);
      console.log(jsonData);
    } catch (err) {
      console.error(err.message);
    }
    
  };

//  let orderId = window.location.pathname.split("/orderUpdate/")[1];
  const getItemlist = async () => {
    
  };

 
  useEffect(() => {
    getWorkOrder();
  }, []);

    useEffect(() => {
      getItemlist();
    }, []);
    


  return (
    <>
      <Header />
      <div className="page-wrapper" ref={ref}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-horiz-scroll">
                    <div>
                      <Headerdata />
                      <MainDetails />
                      <ClientDetails />
                      <Dates />
                      <table width="100%" className="mb-5">
                        <thead>
                          <tr className="bg-gray-100 py-1">
                            <td className="font-bold"> Description </td>
                            <td className="font-bold"> Quantity </td>
                            <td className="font-bold"> Price </td>
                            <td className="font-bold"> Amount </td>
                            {/* <th className="font-bold">Print</th> */}
                          </tr>
                        </thead>
                        {itemslist.map(
                          ({  
                            orderdetails_id,
                            description,
                            quantity,
                            price,
                            amount,
                          }) => (
                            <React.Fragment key={orderdetails_id}>
                              <tbody>
                                <tr>
                                  <td>{description} </td>
                                  <td>{quantity} </td>
                                  <td>{price} </td>
                                  <td>{amount} </td>
                                </tr>
                              </tbody>
                            </React.Fragment>
                          )
                        )}
                      </table>
                      
                      {workorder.map(
                        ({
                          subtotal,
                          igst,
                          tax,
                          cgst,
                          taxc,
                          total,
                          order_id,
                        }) => (
                          <React.Fragment key={order_id}>
                            {/* Subtotal :{subtotal} */}
                            {/* <article className="mb-3 md:grid grid-cols-2">
                                <div className="flex flex-col"> */}
                            <table width="100%">
                              <tbody>
                                <tr className="mb-2">
                                  <td>SubTotal(In Rupees) :</td>
                                  <td> ₹{subtotal}</td>
                                </tr>
                                <tr className="mb-2">
                                  <td>IGST({igst}%) :</td>
                                  <td> ₹ {tax}</td>
                                </tr>
                                <tr className="mb-2">
                                  <td>CGST({cgst}%) :</td>
                                  <td> ₹ {taxc}</td>
                                </tr>
                                <tr className="mb-2">
                                  <td>
                                    Total(In Words) :{intToEnglish(total)}
                                  </td>
                                  <td> ₹{total}</td>
                                </tr>
                              </tbody>
                            </table>
                            {/* </div> */}
                            {/* </article> */}
                          </React.Fragment>
                        )
                      )}
                      
                      <Footer />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default forwardRef(WorkOrder);
