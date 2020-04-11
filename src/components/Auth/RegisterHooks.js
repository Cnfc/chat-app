import React, { Component, useState, useEffect } from "react";
import {
  Grid,
  Form,
  Semantic,
  Button,
  Header,
  Message,
  Icon,
  Segment,
} from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import firebase from "../../firebase/firebase.utils";

const RegisterHooks = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const isFormEmpty = () => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  const isFormValid = () => {
    let errors = [];
    let error;
    console.log("From formisValid");

    if (isFormEmpty()) {
      error = { message: "Fill in all fields" };
      // this.setState({ errors: errors.concat(error) });
      setErrors(errors);
    } else if (!isPasswordValid()) {
      error = { message: "Password is invalid" };
      setErrors(errors);
      return false;
    } else {
      return true;
    }
  };

  const isPasswordValid = () => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      console.log("password less 6 ch");
      return false;
    } else if (password !== passwordConfirmation) {
      console.log("password is not match");
      return false;
    } else {
      console.log("match");
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    if (isFormValid()) {
      setErrors([]);
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((createdUser) => {
          console.log(createdUser);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setErrors(err);
          setLoading(false);
        });
    }
  };

  const displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  const handlerInputError = (errors, inputName) => {
    console.log(errors, inputName);
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? inputName
      : "";
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="orange" textAlign="center">
          <Icon name="puzzle piece" color="olive" />
          Register for DevChat
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
            />

            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              className={handlerInputError(errors, "email")}
            />

            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className={handlerInputError(errors, "password")}
            />

            <Form.Input
              fluid
              name="passwordConfirmation"
              icon="repeat"
              iconPosition="left"
              placeholder="Password Confirmation"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              type="password"
              value={passwordConfirmation}
              className={handlerInputError(errors, "passwordConfirmation")}
            />

            <Button
              disabled={loading}
              className={loading ? "loading" : ""}
              color="olive"
              fluid
              size="large"
            >
              Submit
            </Button>
          </Segment>
        </Form>

        {errors.length > 0 && (
          <Message error>
            <h3>Error</h3>
            {displayErrors(errors)}
          </Message>
        )}

        <Message>
          Already a user? <Link to="/login">Login</Link>{" "}
        </Message>
      </Grid.Column>
    </Grid>
  );
};
export default RegisterHooks;
