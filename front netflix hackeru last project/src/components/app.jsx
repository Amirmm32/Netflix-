import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./NavbarComponent";
import NetflixLogin from "./LoginComponent";
import NetflixLogout from "./LogoutComponent";
import NetflixRegister from "./RegisterComponent";
import NotFound from "./notFound";
import Search from "./search";
import Admin from "./admin";
import AddNew from "./addNew";
import EditUsers from "./editUsers"
import MainComponent from "./MainComponent";
import MylistMainComponent from "./MylistMainComponent";
import FooterComponent from "./FooterComponent";
import PlayerComponent from "./PlayerComponent";
import EditMovie from "./editMovie";
import UserComponent from "./UserComponent";

class App extends Component {

  state = {};
  render() {
    return (
      <React.Fragment>
          <Routes>
            <Route
                path="/login"
                element={
                  <React.Fragment>
                    <NetflixLogin />
                    <FooterComponent />
                  </React.Fragment>
                }
            />
            <Route
                path="/logout"
                element={
                  <React.Fragment>
                    <NetflixLogout />
                    <FooterComponent />
                  </React.Fragment>
                }
            />
            <Route
                path="/register"
                element={
                  <React.Fragment>
                    <NetflixRegister />
                    <FooterComponent />
                  </React.Fragment>
                }
            />
            <Route
                path="/"
                element={
                  <React.Fragment>
                    <Navbar />
                    <MainComponent />
                    <MylistMainComponent genre={"drama"} />
                    <MylistMainComponent genre={"action"} />
                    <MylistMainComponent genre={"romance"} />
                    <MylistMainComponent genre={"family"} />
                    <FooterComponent />
                  </React.Fragment>
                }
            />
            <Route
                path="/search"
                element={
              <React.Fragment>
                  <Navbar />
                  <Search/>
                <FooterComponent />
              </React.Fragment>
              }
            />
            <Route
                path="/admin"
                element={
              <React.Fragment>
                  <Navbar />
                  <Admin/>
                  <FooterComponent />
              </React.Fragment>
              }
            />
              <Route
                  path="/add"
                  element={
                <React.Fragment>
                    <Navbar />
                    <AddNew/>
                    <FooterComponent />
                </React.Fragment>
                }
              />
            <Route
                  path="/edit/:videoId"
                  element={
                <React.Fragment>
                    <Navbar />
                    <EditMovie/>
                    <FooterComponent />
                </React.Fragment>
                }
              />
            <Route
                path="/play/:videoId"
                element={
                  <React.Fragment>
                    <Navbar />
                    <PlayerComponent/>
                    <FooterComponent />
                  </React.Fragment>
                }
            />
              <Route
                path="/user/:userId"
                element={
                  <React.Fragment>
                    <Navbar />
                    <UserComponent />
                    <FooterComponent />
                  </React.Fragment>
                }
            />
            <Route
                path="/users"
                element={
                  <React.Fragment>
                    <Navbar />
                    <EditUsers />
                    <FooterComponent />
                    </React.Fragment>
                }
            />
            <Route path="*" element={
              <React.Fragment>
                <Navbar />
                <NotFound />
              </React.Fragment>
            } />
          </Routes>
      </React.Fragment>
    );
  }
}
App.propTypes = {};


export default App;
