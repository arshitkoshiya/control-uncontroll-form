import React, { useState, useRef } from "react";
import "./index.css";

export default function Form() {
  const [toggle, settoggle] = useState(true);
  /* const [errorbtn, seterrorbtn] = useState(true); */
  const [userRegistration, setUserRegistration] = useState({
    Fname: "",
    Lname: "",
    Age: "",
    Address: "",
    Photo: "",
  });

  const [FirstnameError, setFirstnameError] = useState(false);
  const [LastnameError, setLastnameError] = useState(false);
  const [AgeError, setAgeError] = useState(false);
  const [AddressError, setAddressError] = useState(false);
  const [records, setRecords] = useState([]);
  const inputRef = useRef();

  const handlechange = (e) => {
    const name = e?.target?.name;
    const value = e?.target?.value;
    setUserRegistration({ ...userRegistration, [name]: value });
    validate(name, value);
    setUserRegistration({ ...userRegistration, Photo: e.target.files[0] });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const newRecord = {
      ...userRegistration,
    };

    setRecords([...records, newRecord]);
    setUserRegistration({ Fname: "", Lname: "", Age: "", Address: "" });
    settoggle(!toggle);
  };
  let check;
  const validate = (name, value) => {
    switch (name) {
      case "Fname":
        check = /^[A-Za-z]{0,20}$/.test(value)?
           ""
          : "maximun 20 character allowd and number are not allowd";
        setFirstnameError(check);
        break;

      case "Lname":
        check = /^[a-zA-Z]{0,20}$/.test(value)
          ? ""
          : "maximun 20 character allowd and number are not allowd";
        setLastnameError(check);
        break;

      case "Age":
        setAgeError(
          (check =
            value >= 10 && value < 101
              ? ""
              : "Minimum 10 Year & Maximum 100 Years are allowd")
        );
        break;

      case "Address":
        setAddressError(
          (check =
            value.length < 125 ? "" : "Maximum 125 Charcaters are allowd")
        );
        break;

      default:
        break;
    }
  };
  /* const ImageThumb = ({ image }) => {
    return <img src={URL.createObjectURL(image)} alt={image.name} />;
  }; */

  /* const [file, setFile] = React.useState("");
  function handleUpload(event) {
    setFile(event.target.files[0]);
  } */
  return (
    <>
      {toggle && (
        <div className="form">
          <form action="" method="post" onSubmit={handlesubmit}>
            <div className="fname">
              <b>First Name </b>
              <input
                type="text"
                autoComplete="off"
                name="Fname"
                id="Fname"
                value={userRegistration.Fname}
                onChange={handlechange}
                placeholder="First Name"
                required
              />
              <h6>{FirstnameError}</h6>
            </div>
            <div className="Lname">
              <b> Last Name </b>

              <input
                type="text"
                autoComplete="off"
                name="Lname"
                id="Lname"
                value={userRegistration.Lname}
                onChange={handlechange}
                placeholder="Last Name"
                required
              />
              <h6>{LastnameError}</h6>
            </div>
            <div className="age">
              <b> Age </b>
              <input
                type="number"
                autoComplete="off"
                name="Age"
                id="Age"
                placeholder="Age"
                value={userRegistration.Age}
                onChange={handlechange}
                required
              />
              <h6>{AgeError}</h6>
            </div>

            <div className="address">
              <b> Address </b>
              <textarea
                autoComplete="off"
                name="Address"
                id="Address"
                cols="20"
                rows="1"
                value={userRegistration.Address}
                onChange={handlechange}
                placeholder="Address"
              ></textarea>
              <h6>{AddressError}</h6>
            </div>
            <div className="photo">
              <b> Uplode Your Photo </b>
              <input
                type="file"
                ref={inputRef}
                name="Photo"
                id=""
                onChange={handlechange}
              />
            </div>
            <br />
            <center>
              
                <button type="submit"  name="Submit" id="btn">
                  Submit
                </button>
              
            </center>
          </form>
        </div>
      )}
      {records.map((currentData) => {
        return (
          <div className="Card">
            <div className="cardphoto">
              {" "}
              <img src={URL.createObjectURL(currentData.Photo)} />
            </div>
            <div className="cardname">
              <p>
                {currentData.Fname} {currentData.Lname} <br /> {currentData.Age}{" "}
                Year old
              </p>
            </div>
            <div className="cardaddress">
              <h2>Address : {currentData.Address}</h2>
            </div>
          </div>
        );
      })}
    </>
  );
}
