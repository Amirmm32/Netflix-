import React from "react";
import { Link } from "react-router-dom"; // Import the CSS file for styling

const handleSignOut = () => {
  // Remove cookies by setting the expiration date to the past
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // Clear local storage
  localStorage.clear();

  // Redirect to the sign-in page or perform any other sign-out related tasks
  // (e.g., updating the authentication state)
};
class LogoutPage extends React.Component {
  render() {
    return (
      <main id={"logout"} style={{ padding: "0px 10px" }}>
        <header className="d-flex space-between middle-align">
          <img
            src="./images/logo.PNG"
            height="50px"
            width="170px"
            alt="site logo main"
          />
          <Link to="/login">
            <button className="button">Sign In</button>
          </Link>
        </header>
        <section id="logout-section" className="d-flex flex-center">
          <div className="logoutContainer f-s-20 d-flex flex-center direction-column">
            <h2 className="signOutHeader f-s-28 f-w-4">Signed Out</h2>
            <p className="logoutMessage">
              Only members using a shared or public computer need to end each
              visit to Netflix by using the Sign Out link.
            </p>
            <p className="logoutMessage">
              This computer will be redirected to the Netflix home page in 30
              seconds.
            </p>

            <Link to="/login">
              <button className="button logoutButton" onClick={handleSignOut}>
                Continue
              </button>
            </Link>
          </div>
        </section>
      </main>
    );
  }
}

export default LogoutPage;
