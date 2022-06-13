import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import react, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import _default from "react-bootstrap/FormControl";
export const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    errors: {},
  });

  const navigate = useNavigate();
  const handleData = (e) => {
    // console.log(e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;
    if (!data.name) {
      formIsValid = false;
      errors["name"] = "*Email is required";
    }
    if (data.name.length < 3) {
      formIsValid = false;
      errors["name"] = "*Username atleast be 3 characters";
    }
    if (!data.email) {
      formIsValid = false;
      errors["email"] = "*Please enter your email";
    }
    if (data.email) {
      //regular expression for email validation
      let pattern = new RegExp(
        /^(('[\w-\s]+')|([\w-]+(?:\.[\w-]+)*)|('[\w-\s]+')([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(data.email)) {
        formIsValid = false;
        errors["email"] = "Please enter valid email";
      }
    }
    if (!data.password) {
      formIsValid = false;
      errors["password"] = "Password is required";
    }

    if (data.password) {
      if (
        !data.password.match(/^.*(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}).*$/)
      ) {
        formIsValid = false;
        errors["password"] =
          "Password must be mix of alphabet,number,special charecters";
      }
    }
    setData({ ...data, errors });
    return formIsValid;
  };

  const Registerd = (data) => {
    axios
      .post("http://localhost:8080/sign", {
        name: data.name,
        email: data.email,
        password: data.password,
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        navigate("/login");
      })
      .catch(function (error) {
        alert("user is already exist!please login");
        console.log(error, "erer");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      Registerd(data);
    }
  };
  console.log(data);
  return (
    <>
      <Container
        fluid="xxl"
        style={{
          color: "blue",
          border: "1px solid green",
          width: "800px",
          height: "600px",
          background: "palegreen",
          boxShadow: "2px 2px 9px green",
          position: "relative",
        }}
      >
        <Container
          fluid="lg"
          className="mw-100"
          style={{
            color: "blue",
            border: "1px solid green",
            width: "600px",
            height: "300px",
            MaxHeight: "100%",
            background: "white",
            boxShadow: "1px 2px 9px green",
            position: "absolute",
            left: "12%",
            top: "15%",
          }}
        >
          <Form>
            <Row style={{ marginTop: "10px" }}>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Smalll
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="name"
                  defaultValue={data.name}
                  onChange={handleData}
                  aria-describedby="inputGroup-sizing-sm"
                  style={{
                    border: "1px solid green",
                  }}
                />
              </InputGroup>
              {/* {<span display={submit}>{errors.name}</span>} */}
              <span className="errorMsg" style={{ color: "red" }}>
                {data.errors.name}
              </span>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Small
                </InputGroup.Text>
                <FormControl
                  type="email"
                  name="email"
                  defaultValue={data.email}
                  onChange={handleData}
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  style={{ border: "1px solid green" }}
                />
              </InputGroup>
              <span className="errorMsg" style={{ color: "red" }}>
                {data.errors.email}
              </span>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text
                  id="inputGroup-sizing-sm"
                  style={{ background: "green", color: "white" }}
                >
                  @
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="password"
                  defaultValue={data.password}
                  onChange={handleData}
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  style={{ border: "1px solid green" }}
                />
              </InputGroup>
              <span className="errorMsg" style={{ color: "red" }}>
                {data.errors.password}
              </span>
            </Row>

            <Row style={{ marginTop: "10px" }}>
              <Button
                onClick={handleSubmit}
                size="sm"
                className="mb-3"
                style={{
                  margin: "auto",
                  width: "60%",
                  borderRadius: "10px",
                  background: "green",
                }}
              >
                Sign-Up
              </Button>
            </Row>

            <Row>
              <p style={{ color: "green" }}>
                ALready registerd!!
                <Link
                  to={"/login"}
                  style={{ fontWeight: "bold", color: "green" }}
                >
                  Login here{" "}
                </Link>
              </p>
            </Row>
          </Form>
        </Container>
      </Container>
    </>
  );
};
