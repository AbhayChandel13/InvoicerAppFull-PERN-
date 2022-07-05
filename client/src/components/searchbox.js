import React,{useState} from "react";
import { FaSearch } from "react-icons/fa";



const SearchBox = ({ value, valuetext,value2,value1, onChange}) => { 

  return (
    <>
      <div className="input-group">
        {/* <input
          type="date"
          name="dateStart"
          // className="form-control my-3"
          placeholder="Search by Order_id Or Date(yyyy-mm-dd)"
          value={value1}
          onChange={(e) => onChange(e.currentTarget.value)}
        /> */}

        <input
          type="text"
          name="name"
          id="name"
          placeholder={"Search  here"}
          value={valuetext}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
        {/* <div style={{ height: "47px" }}>
          <select
            className="form-control"
            name="date"
            value={value}
            onChange={(e) => onChange(e.currentTarget.value)}
          >
            <option key="Select date range" value="first" default>
              Select date range
            </option>
            <option key="pasthours" value="pasthours">
              Past hours
            </option>
            <option key="past24hours" value="past24hours">
              Past 24 hours
            </option>

            <option key="lastweek" value="lastweek">
              Past last Week
            </option>
            <option key="lastmonth" value="lastmonth">
              Past last Month
            </option>
          </select>
        </div> */}

        <div className="input-group-append ">
          <button
            className="input-group-text"
            //onClick={buttonclick}
            style={{ height: "47px" }}
          >
            <FaSearch />
          </button>
        </div>
      </div>

      {/* <button className=" text-2xl p-2" onClick={(e)=>e.currentTarget.value}>
        <FaSearch />
      </button> */}
      {/* <label htmlFor="search" className="p-3" style={{ width: "150px" }}>
        Search by Date
      </label>
      <input
        type="date"
        name="query"
        // className="form-control my-3"
        placeholder="Search by Order_id Or Date(yyyy-mm-dd)"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      /> */}
    </>
  );
};

export default SearchBox ;
