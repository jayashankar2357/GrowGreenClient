import React, { Component } from "react";

class Image extends Component<{ Test: string }> {
  render() {
    if (true) {
      return (
        <div
          className="PeoplePlusAvatar avatar flex-col flex-align-center flex-justify-center ImageStyle"
          title={this.props.Test}
        >
          <span className="PeoplePlusAvatar avatar-text flex-display flex-align-center flex-justify-center">
            {this.props.Test}
          </span>
        </div>
      );
    } else {
      return (
        <div
          className="PeoplePlusAvatar avatar flex-col flex-align-center flex-justify-center ImageStyle"
          title={this.props.Test}
        >
          <img
            className="PeoplePlusAvatar avatar flex-col flex-align-center flex-justify-center small ImageStyle"
            style={{ backgroundImage: "url(" + this.props.Test + ")" }}
          ></img>
        </div>
      );
    }
  }
}
export default Image;
