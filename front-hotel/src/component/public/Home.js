import React, { Component } from "react";
import Header from "../common/Header";

export default class Home extends Component {
  state = {};
  render() {
    const title = <h2>Home</h2>;
    return (
      <div>
        <Header path="/" />
        {title}
      </div>
    );
  }
}
