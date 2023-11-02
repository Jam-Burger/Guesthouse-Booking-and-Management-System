import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


const LoginPage = () => {
  const [message, setMessage] = useState("");
  const navigate   = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      emailId: e.target.emailId.value,
      password: e.target.password.value,
    };
    try {
      const response = await axios.post(
        "http://localhost:4000/users/login",
        user
      );
      if (response.data.msg) {
        setMessage(response.data.msg);
        console.log(response.data.msg);
      }

      if (response.data.redirect) {
        navigate("/",{state:{isLoggedIn : true, user: response.data.user}});
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section
      className="vh-110 bg-image"
      style={{
        backgroundImage:
          "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
      }}
    >
    <Navbar />
      <div className="mask d-flex align-items-center vh-100 gradient-custom-3">
        <div className="container vh-100 my-2">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Login</h2>
                  {/* loginForm */}
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-3">
                      <label className="form-label" htmlFor="emailId">
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="emailId"
                        id="emailId"
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="form-outline mb-3">
                      <label className="form-label" htmlFor="password">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                  <div>
                    <p className="text-center text-muted mt-3 mb-0">
                      Don't have an account?{" "}
                      <a href="/register" className="fw-bold text-body">
                        <u>Signup here</u>
                      </a>
                    </p>
                  </div>

                  <div className="text-center  mt-3 mb-0">{message}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
