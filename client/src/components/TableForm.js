import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const TableForm = ({
  orderdetails_id,
  setOrderdetails_id,
  description,
  setDescription,
  quantity,
  setQuantity,
  price,
  setPrice,
  igst,
  setIgst,
  cgst,
  setCgst,
  tax,
  setTax,
  taxc,
  setTaxc,
  amount,
  setAmount,
  list,
  setList,
  subtotal,
  setSubtotal,
  total,
  setTotal,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description || !quantity || !price) {
      alert("Please Enter Correct Item data!");
    } else {
      const newItems = {
        id: uuidv4(),
        //orderdetails_id,
        description,
        quantity,
        price,
        amount,
      };
      //setOrderdetails_id("");
      setDescription("");
      setQuantity("");
      setPrice("");
      setAmount("");
      setList([...list, newItems]);
      setIsEditing(false);
      // console.log(list);
    }
  };

  //Number funtion
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

  // console.log(intToEnglish(total));

  //Edit  Function
  const editRow = (id) => {
    const editingRow = list.find((row) => row.id === id);
    setList(list.filter((row) => row.id !== id));
    setIsEditing(true);
    // setOrderdetails_id(editingRow.orderdetails_id);
    setDescription(editingRow.description);
    setQuantity(editingRow.quantity);
    setPrice(editingRow.price);
  };

  //var disabled = document.getElementById("table").disabled;
  if (isEditing === "Edit Item") {
    document.getElementById("table").visible = false;
  }

  //Delete Function

  const deleteRow = (id) => {
    setList(list.filter((row) => row.id !== id));
  };

  //Calculate the Amount  function
  useEffect(() => {
    const calculateAmount = (amount) => {
      setAmount(quantity * price);
    };

    calculateAmount(amount);
  }, [amount, price, quantity, setAmount]);

  //Calculate the Total Amount  function
  useEffect(() => {
    let rows = document.querySelectorAll(".amount");
    let sum = 0;
    let sum1 = 0;
    let sum2 = 0;

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].className === "amount") {
        sum += isNaN(rows[i].innerHTML) ? 0 : parseFloat(rows[i].innerHTML);
      }
    }

    var tax = (sum / 100) * igst;
    //  console.log(tax);
    var taxc = (sum / 100) * cgst;
    //console.log(taxc);
    sum1 += tax + taxc;
    sum2 += sum + sum1;
    //sum += taxc
    setTax(tax);
    setTaxc(taxc);
    setSubtotal(sum.toFixed(2));
    setTotal(sum2.toFixed(2));
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:mt-16">
          <div className="md:grid grid-cols-2 gap-10 ">
            {/* <div className="flex flex-col">
              <label htmlFor="id"> Id</label>
              <input
                type="text"
                name="id"
                id="id"
                placeholder="id"
                value={orderdetails_id}
                onChange={(e) => setOrderdetails_id(e.target.value)}
              />
            </div> */}
            <div className="flex flex-col">
              <label htmlFor="description"> Item Description </label>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Item description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="quantity"> Quantity</label>
              <input
                type="text"
                name="quantity"
                id="quantity"
                placeholder="Item quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="md:grid grid-cols-2 gap-10 ">
          <div className="flex flex-col">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              name="price"
              id="price"
              placeholder="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="Amount"> Item Amount</label>
            <input
              type="text"
              name="amount"
              id="amount"
              placeholder="amount"
              defaultValue={amount}
            />
          </div>
        </div>

        <button
          type="submit"
          className="mb-5 bg-blue-500 py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
        >
          {isEditing ? "Edit Item" : "Add Item"}
        </button>

        <div className="md:grid grid-cols-3 gap-10  mt-1 mb-9">
          <div className="flex flex-col">
            <label htmlFor="subtotal">Subtotal</label>
            <div className="input-group ">
              <div className="input-group-prepend">
                <span className="input-group-text">₹</span>
              </div>
              <input
                type="text"
                className="form-control"
                defaultValue={subtotal}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="IGST">IGST</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                name="IGST"
                id="IGST"
                placeholder="IGST"
                value={igst}
                onChange={(e) => setIgst(e.target.value)}
              />
              <div className="input-group-append">
                <span className="input-group-text">%</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="CGST">CGST</label>
            <div className="input-group ">
              <input
                type="text"
                className="form-control"
                name="CGST"
                id="CGST"
                placeholder="CGST"
                value={cgst}
                onChange={(e) => setCgst(e.target.value)}
              />
              <div className="input-group-append">
                <span className="input-group-text">%</span>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Table Items */}
      <table width="100%" className="mb-10" id="table">
        <thead>
          <tr className="bg-gray-100 py-1">
            {/* <td className="font-bold"> orderdetails_id </td> */}
            <td className="font-bold"> Description </td>
            <td className="font-bold"> Quantity </td>
            <td className="font-bold"> Price </td>
            <td className="font-bold"> Amount </td>
          </tr>
        </thead>
        {list.map(
          ({ id, orderdetails_id, description, quantity, price, amount }) => (
            <React.Fragment key={id}>
              <tbody>
                <tr>
                  <td>{description} </td>
                  <td>{quantity} </td>
                  <td>{price} </td>
                  <td className="amount">{amount} </td>
                  <td>
                    <button onClick={() => editRow(id)}>
                      <FaEdit className="text-green-500 font-bold text-xl" />
                    </button>
                  </td>
                  <td>
                    <button onClick={() => deleteRow(id)}>
                      <MdDelete className="text-red-500 font-bold text-xl" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </React.Fragment>
          )
        )}
      </table>
      <article className="mb-3 md:grid grid-cols-2">
        <div className="flex flex-col">SubTotal(In Rupees) : </div>
        <div className="flex flex-col">₹{subtotal}</div>
      </article>
      <article className="mb-3 md:grid grid-cols-2">
        <div className="flex flex-col">IGST({igst}%) : </div>
        <div className="flex flex-col">₹{tax}</div>
      </article>
      <article className="mb-3 md:grid grid-cols-2">
        <div className="flex flex-col">CGST({cgst}%) : </div>
        <div className="flex flex-col">₹{taxc}</div>
      </article>
      <article className="mb-3 md:grid grid-cols-2">
        <div className="flex flex-col">
          GrandTotal(In Rupees) : {intToEnglish(total)}
        </div>
        <div className="flex flex-col">₹{total}</div>
      </article>
    </>
  );
};

export default TableForm;
