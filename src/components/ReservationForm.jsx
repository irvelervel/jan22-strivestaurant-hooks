// every time you have to build a form, you need a STATE
// -> every time you write a form, you need a Class Components

import { useState } from "react";
import { Form, Button } from "react-bootstrap";

// name <-- string
// phone <-- string || number
// numberOfPeople <-- string || number
// smoking <-- boolean
// dateTime <-- string
// specialRequests <-- string (optional)

const ReservationForm = () => {
  // for creating a form in React, we need a state object
  // because we're going to create a CONTROLLED FORM

  // state = {
  // reservation: {
  //   name: "",
  //   phone: "",
  //   numberOfPeople: 1,
  //   smoking: false,
  //   dateTime: "",
  //   specialRequests: "",
  // },
  // };

  const [reservation, setReservation] = useState({
    name: "",
    phone: "",
    numberOfPeople: 1,
    smoking: false,
    dateTime: "",
    specialRequests: "",
  });

  const handleChange = (fieldToUpdate, value) => {
    // console.log("FIELDTOUPDATE", fieldToUpdate);
    // this.setState({
    //   reservation: {
    //     ...this.state.reservation,
    //     [fieldToUpdate]: value,
    //     // this is only needed for setting an object property
    //     // without the square brackets, you're NOT reading your argument
    //     // you're actually just setting a NEW property called "fieldToUpdate"
    //   },
    // });

    setReservation({
      ...reservation,
      // the spread operator (...) takes into this new object
      // every pair of key/value already existing on the reservation state variable
      [fieldToUpdate]: value,
    });
  };

  // this function crashes
  //   handleClick() {
  //     console.log(this);
  //     // this here is UNDEFINED
  //     // because a normal function has its own scope
  //     // so "this" is a different thing here!
  //     this.setState({
  //       yoji: false,
  //     });
  //   }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(reservation);
    // CRUD
    // for reading values, you use GET
    // for creating values, you use POST
    // for updating values, you use PUT
    // for deleting values, you use DELETE

    // let's recap quickly how network calls work
    // and the fetch()

    // let's recap how the chained thens method works:
    // fetch("https://striveschool-api.herokuapp.com/api/reservation", {
    //   method: "POST",
    //   body: JSON.stringify(this.state.reservation),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => {
    //     console.log(response);
    // if (response.ok) {
    //   alert("reservation saved!");
    // } else {
    //   alert("something went wrong!");
    // }
    //   })
    //   .catch((e) => {
    //     console.log("error was", e);
    //   });

    // let's recap how async/await works
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/reservation",
        {
          method: "POST",
          body: JSON.stringify(reservation),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.ok) {
        alert("reservation saved!");
        emptyForm();
      } else {
        alert("something went wrong!");
      }
    } catch (error) {
      console.log("error was", error);
    }
  };

  const emptyForm = () => {
    // this.setState({
    //   reservation: {
    //     name: "",
    //     phone: "",
    //     numberOfPeople: 1,
    //     smoking: false,
    //     dateTime: "",
    //     specialRequests: "",
    //   },
    // });
    setReservation({
      name: "",
      phone: "",
      numberOfPeople: 1,
      smoking: false,
      dateTime: "",
      specialRequests: "",
    });
  };

  return (
    <div>
      <h2>RESERVE A TABLE NOW!!</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Your name</Form.Label>
          {/* Form.Control is the <input /> */}
          <Form.Control
            type="text"
            placeholder="Enter your name here"
            value={reservation.name}
            // for changing the content of this input field
            // we have to CHANGE THE STATE
            onChange={(e) =>
              // this.setState({
              //   reservation: {
              //     ...this.state.reservation,
              //     // the spread operator allows me to start from the EXISTING reservation
              //     // ...this.state.reservation is bringing into this new reservation object
              //     // the existing properties! name, phone, numberOfPeople etc.
              //     name: e.target.value,
              //     // I should find a way of preserving the other fields here!
              //   },
              // })
              handleChange("name", e.target.value)
            }
            required
          />
        </Form.Group>

        {/* {this.state.reservation.name === "Stefano" ? (
            <div>Oh, you're named Stefano!</div>
          ) : (
            <div>I don't recognize this name</div>
          )} */}

        <Form.Group>
          <Form.Label>Your phone</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter your phone here"
            value={reservation.phone}
            onChange={(e) =>
              // this.setState({
              //   reservation: {
              //     ...this.state.reservation,
              //     phone: e.target.value,
              //   },
              // })
              handleChange("phone", e.target.value)
            }
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>How many people?</Form.Label>
          <Form.Control
            as="select"
            value={reservation.numberOfPeople}
            onChange={(e) => handleChange("numberOfPeople", e.target.value)}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Check
            type="checkbox"
            label="Do you smoke?"
            checked={reservation.smoking}
            // checked uses true/false
            // value is "on" or "off"
            onChange={(e) => handleChange("smoking", e.target.checked)}
            // "checked" is just a checkbox thing :)
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Date and time</Form.Label>
          <Form.Control
            type="datetime-local"
            value={reservation.dateTime}
            onChange={(e) => handleChange("dateTime", e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Any special request?</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={reservation.specialRequests}
            onChange={(e) => handleChange("specialRequests", e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ReservationForm;
