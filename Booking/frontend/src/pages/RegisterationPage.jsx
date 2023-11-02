import RegisterForm from "../components/RegisterForm";
import Navbar from "../components/Navbar";
const RegisterationPage = () => {
  return (
    <section
      className="vh-110 bg-image"
      style={{
        backgroundImage:
          "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
      }}
    >
      <Navbar />
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100 my-2">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Create an account
                  </h2>
                  <RegisterForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterationPage;
