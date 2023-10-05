import React from "react";
import axios from "axios";

function RegisterForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      contactNo: e.target.contactNo.value,
      emailId: e.target.emailId.value,
      password: e.target.password.value,
      gender: e.target.gender.value,
      age: e.target.age.value,
      profilePic: e.target.profilePic.value,
    };

    console.log("user saved", user);
    try {
      await axios.post("http://localhost:4000/users", user);
      console.log("user saved", user);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-outline mb-3">
        <label className="form-label" htmlFor="firstName">
          Your First Name
        </label>
        <input type="text" name="firstName" className="form-control " />
      </div>
      <div className="form-outline mb-3">
        <label className="form-label" htmlFor="lastName">
          Your Last Name
        </label>
        <input type="text" name="lastName" className="form-control " />
      </div>
      <div className="form-outline mb-3">
        <label className="form-label" htmlFor="contactNo">
          Your Contact Number{" "}
        </label>
        <input
          className="form-control"
          type="number"
          name="contactNo"
          maxLength={10}
          minLength={10}
          min={1e10}
          required
        />
      </div>

      <div className="form-outline mb-3">
        <label className="form-label" htmlForfor="emailId">
          Your Email
        </label>
        <input type="email" name="emailId" className="form-control" />
      </div>

      <div className="form-outline mb-3">
        <label className="form-label" htmlForfor="password">
          Password
        </label>
        <input type="password" name="password" className="form-control" />
      </div>

      <div className="form-outline mb-3">
        <label className="form-label" htmlFor="gender">
          Gender
        </label>
        <select name="gender" className="form-control" required>
          <option value="">Please select one…</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-outline mb-3">
        <label className="form-label" htmlFor="age">
          Age
        </label>
        <input
          className="form-control"
          type="number"
          name="age"
          min="3"
          max="100"
          required
        />
      </div>
      <div className="form-outline mb-3">
        <label className="form-label" htmlFor="profilePic">
          Profile Picture
        </label>
        <input
          className="form-control"
          type="file"
          name="profilePic"
          accept="image/*"
        />
      </div>

      <div className="d-flex justify-content-center">
        <button
          type="submit"
          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
        >
          Register
        </button>
      </div>

      <p className="text-center text-muted mt-3 mb-0">
        Have already an account?{" "}
        <a href="/login" className="fw-bold text-body">
          <u>Login here</u>
        </a>
      </p>
    </form>
  );
}

export default RegisterForm;