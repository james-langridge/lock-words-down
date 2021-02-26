import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
`;

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/list");
    }
  }

  componentWillReceiveProps(nextProps) {
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <Container className="text-center">
        <form className="form-signin" noValidate onSubmit={this.onSubmit}>
          <h1 className="h3 mb-3 font-weight-normal">Please register</h1>
          <label className="sr-only" htmlFor="name">Name</label>
          <input
            onChange={this.onChange}
            error={errors.name}
            value={this.state.name}
            id="name"
            type="text"
            className="form-control"
            placeholder="Name"
            required=""
            autoFocus=""
          />
          <span className="red-text">
            {errors.email}
            {errors.emailnotfound}
          </span>
          <label className="sr-only" htmlFor="email">Email</label>
            <input
              onChange={this.onChange}
              error={errors.email}
              value={this.state.email}
              id="email"
              type="email"
              className="form-control"
              placeholder="Email"
              required=""
            />
          <span className="red-text">{errors.email}</span>
          <label className="sr-only" htmlFor="password">Password</label>
            <input
              onChange={this.onChange}
              error={errors.password}
              value={this.state.password}
              id="password"
              type="password"
              className="form-control"
              placeholder="Password"
              required=""
            />
          <span className="red-text">{errors.password}</span>
          <label className="sr-only" htmlFor="password2">Confirm password</label>
            <input
              onChange={this.onChange}
              error={errors.password2}
              value={this.state.password2}
              id="password2"
              type="password"
              className="form-control"
              placeholder="Confirm password"
              required=""
            />
          <span className="red-text">{errors.password2}</span>
          <button
            type="submit"
            className="mb-3 btn btn-lg btn-primary btn-block"
          >
            Sign up
          </button>
          <p>Already have an account? <Link to="/login">Log in</Link></p>
          <p className="mt-5 mb-3 text-muted">© 2021</p>
        </form>
      </Container>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
