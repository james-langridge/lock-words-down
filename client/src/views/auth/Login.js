import { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../store/authentication/authentication.actions";
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';

const Container = styled.div`
  width: 100%;
  max-width: 330px;
  padding: 40px 15px 40px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/list");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/list");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <Container className="text-center">
        <Form className="form-signin" noValidate onSubmit={this.onSubmit}>
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <Form.Group controlId="email">
            <Form.Label srOnly>Email address</Form.Label>
            <Form.Control
              onChange={this.onChange}
              error={errors.email}
              value={this.state.email}
              type="email"
              placeholder="Email address"
              required=""
              autoFocus=""
            />
            <span className="red-text">
              {errors.email}
              {errors.emailnotfound}
            </span>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label srOnly>Password</Form.Label>
            <Form.Control
              onChange={this.onChange}
              error={errors.password}
              value={this.state.password}
              type="password"
              placeholder="Password"
              required=""
            />
            <span className="red-text">
              {errors.password}
              {errors.passwordincorrect}
            </span>
          </Form.Group>
          <Button block
            variant="primary"
            type="submit"
            size="lg"
            className="mb-3"
          >
            Sign in
          </Button>
          <p>No account yet?  <Link to="/register">Register here</Link></p>
          <p className="mt-5 mb-3 text-muted">© James Langridge 2021</p>
        </Form>
      </Container>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
