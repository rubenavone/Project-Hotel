import React, { Component } from "react";
import Header from "../common/Header";
import { Route, Switch, Link } from "react-router-dom";
import Reservations from "./Reservations";
import Periods from "./Periods";
import Rooms from "./Rooms";

export default class Admin extends Component {
  state = {};

  isSelected = (path) => {
    const urlPath = this.props.location.pathname;
    console.log(urlPath);
    // return path === this.props.path
    //   ? "rounded mt-3 p-2 h5 btn-danger"
    //   : " rounded mt-3 p-2 h5 btn-primary";
    return path === urlPath
      ? "rounded m-4 p-2 h5 btn-danger"
      : " rounded m-4 p-2 h5 btn-primary";
  };

  render() {
    return (
      <div className="container-fluid">
        <Header path="/admin" />
        <main className="container">
          <div className="row">
            <nav className="d-flex mt-4">
              <ul className="list-unstyled text-dark  d-flex justify-content-end">
                <li>
                  <Link
                    className={this.isSelected("/admin/reservations")}
                    to="/admin/reservations"
                  >
                    Réservations
                  </Link>
                </li>
                <li>
                  <Link
                    className={this.isSelected("/admin/rooms")}
                    to="/admin/rooms"
                  >
                    Chambres
                  </Link>
                </li>
                <li>
                  <Link
                    className={this.isSelected("/admin/periods")}
                    to="/admin/periods"
                  >
                    Prix par périodes
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="container-fluid">
            <Switch>
              <Route path="/admin/reservations" component={Reservations} />
              <Route path="/admin/rooms" component={Rooms} />
              <Route path="/admin/periods" component={Periods} />
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}
