import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { Component } from "react";
import Slider from "react-slick";

export default class AutoPlay extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      speed: 4000,
      autoplaySpeed: 5000,
      //   cssEase: "linear",
      arrows: false,
    };
    return (
      <div style={{ width: "700px" }}>
        <Slider {...settings}>
          <div>
            <img src={require("./LOGO1.png")} alt="" />
          </div>
          <div>
            <img src={require("./LOGO2.png")} alt="" />
          </div>
          <div>
            <img src={require("./LOGO3.png")} alt="" />
          </div>
          <div>
            <img src={require("./LOGO4.png")} alt="" />
          </div>
          <div>
            <img src={require("./LOGO1.png")} alt="" />
          </div>
          <div>
            <img src={require("./LOGO2.png")} alt="" />
          </div>
          <div>
            <img src={require("./LOGO3.png")} alt="" />
          </div>
          <div>
            <img src={require("./LOGO4.png")} alt="" />
          </div>
        </Slider>
      </div>
    );
  }
}
