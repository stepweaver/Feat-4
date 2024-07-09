import React from "react";

const LoginForm = ({ user, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} autoComplete="off">
      {" "}
      {/* Form submission handler */}
      <div className="form-group">
        {" "}
        {/* Email input field */}
        <label>Email</label>
        <br />
        <input
          type="email"
          className="form-control"
          id="email-input"
          value={user.email}
          onChange={onChange}
          name="email"
          placeholder="email"
          required
        />
      </div>
      <div className="form-group">
        {" "}
        {/* Password input field */}
        <label>Password</label>
        <br />
        <input
          type="password"
          className="form-control"
          id="password-input"
          value={user.password}
          onChange={onChange}
          name="password"
          placeholder="password"
          required
        />
      </div>
      <div className="form-group">
        {" "}
        {/* Submit button */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default LoginForm; // Export the LoginForm component
