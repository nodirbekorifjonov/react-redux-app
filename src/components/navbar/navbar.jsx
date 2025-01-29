import { Link } from "react-router-dom";
import { logo } from "../../constants/constants";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  return (
    <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom container pt-3">
      <Link
        to={"/"}
        className="d-flex align-items-center link-body-emphasis text-decoration-none"
      >
        {logo}
        <span className="fs-4 fw-bold">Sammi</span>
      </Link>

      <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
        {isLoggedIn ? (
          <>
            <p className="me-3 py-2 m-0 text-dark text-decoration-none">
              {user.username}
            </p>
            <button className="btn btn-outline-danger">Logout</button>
          </>
        ) : (
          <>
            <Link
              className="me-3 py-2 link-body-emphasis text-decoration-none"
              to={"/login"}
            >
              Login
            </Link>
            <Link
              className="me-3 py-2 link-body-emphasis text-decoration-none"
              to={"/register"}
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
