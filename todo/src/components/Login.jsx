import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export const Login = () => {
  const [data, setData] = useState({ email: "", password: "", errors: {} });
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validform = () => {
    let errors = {};
    let formIsValid = true;
    if (!data.email) {
      formIsValid = false;
      errors["email"] = "Enter Registerd Email";
    }
    if (!data.password) {
      formIsValid = false;
      errors["password"] = "Enter Registerd password";
    }
    setData({ ...data, errors });
    return formIsValid;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validform()) {
      logges(data);
    }
  };
  const logges = () => {
    axios
      .post("http://localhost:8080/login", {
        email: data.email,
        password: data.password,
      })
      .then(function (response) {
        let name = response.data.user.name;
        let token = response.data.token;
        let id = response.data.user._id;
        let arr = [name, token, id];
        window.localStorage.setItem("token", [arr]);
        navigate("/home");
      })
      .catch(function (error) {
        let errors = {};
        errors["password"] = error.response.data.message;
        setData({ ...data, errors });
        setError(error.response.data.message);
      });
  };
  console.log(error);
  const settoken = () => {
    let yes = localStorage.getItem("token");
    let y = yes.split(",");
    axios.defaults.baseURL = "http://localhost:8080/";
    return y;
  };
  const R = () => {
    let y = settoken();
    axios.defaults.headers.common = { Authorization: `Bearer ${y[1]}` };
    let s = { todo: "ibtis" };
    axios
      .post("http://localhost:8080/todos", s, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error, "erer");
      });
  };
  const s = () => {
    axios
      .get("http://localhost:8080/todos")
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error, "erer");
      });
  };

  return (
    <>
      <Button onClick={R}>hr</Button>
      <Button onClick={s}>me</Button>
      <Container
        fluid="xxl"
        style={{
          color: "blue",
          border: "1px solid green",
          width: "600px",
          height: "400px",
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
            width: "70%",
            height: "200px",
            // marginTop: "80px",
            MaxHeight: "100%",
            background: "white",
            boxShadow: "1px 2px 9px green",
            // zIndex: "2",
            position: "absolute",
            left: "12%",
            top: "15%",
          }}
        >
          <Form>
            <Row style={{ marginTop: "10px" }}>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Small
                </InputGroup.Text>
                <Form.Control
                  type="text"
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
                type="submit"
                size="sm"
                className="mb-3"
                style={{
                  margin: "auto",
                  width: "60%",
                  borderRadius: "10px",
                  background: "green",
                }}
              >
                Log In
              </Button>
            </Row>
            <Row>
              <span>
                <Link to="/" style={{ fontWeight: "bold", color: "green" }}>
                  Register First!!
                </Link>
              </span>
            </Row>
          </Form>
        </Container>
      </Container>
    </>
  );
};
