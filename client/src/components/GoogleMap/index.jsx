import React, { useEffect, useState } from "react";

// 2022-07-12 PG
// 載入 Google Map
const GoogleMap = ({ dataList }) => {
  const { location, mapId } = dataList;

  // 初始化資訊
  const google = window.google;

  const [referenceRout, setReferenceRout] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const textStyle = {
    fontSize: "18px",
    fontWeight: "bold",
  };

  useEffect(() => {
    if (
      typeof location.from.addr !== "undefined" &&
      typeof location.from.name !== "undefined"
    ) {
      initDirectionsMap();
    } else {
      initMap();
    }
  });

  // 2022-07-12 PG
  // 初始化地圖：單一地點
  const initMap = async () => {
    const toGeocode = await addrToGeocode(location.to.addr);

    if (toGeocode.status) {
      // 設定地圖選項
      const mapOptions = {
        center: new google.maps.LatLng(toGeocode.geocode),
        zoom: 16,
        maxZoom: 20,
        minZoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      };

      const map = new google.maps.Map(
        document.getElementById(mapId),
        mapOptions
      );
      // 設定地標
      addMarker(map, toGeocode.geocode, location.to.name);
    } else {
      // 若轉換失敗...
      console.log(toGeocode.errMsg);
      console.log(dataList);
    }
  };

  // 2022-07-12 PG
  // 初始化地圖：兩個地點
  const initDirectionsMap = async () => {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();

    const mapOptions = {
      center: new google.maps.LatLng(0, 0),
      zoom: 15,
      maxZoom: 20,
      minZoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    const map = new google.maps.Map(document.getElementById(mapId), mapOptions);

    // 設定路線圖層
    directionsDisplay.setMap(map);

    // 取得地點經緯度
    const fromGeocoder = await addrToGeocode(location.from.addr);
    const toGeocoder = await addrToGeocode(location.to.addr);

    // 如果都成功取得才繼續處理
    if (fromGeocoder.status && toGeocoder.status) {
      // 初始化路線
      var request = {
        origin: fromGeocoder.geocode,
        destination: toGeocoder.geocode,
        travelMode: "DRIVING",
      };

      // 繪製路線
      directionsService.route(request, function (result, status) {
        if (status == "OK") {
          directionsDisplay.setDirections(result);
          setReferenceRout("參考路線");
          setDuration("距離：" + result.routes[0].legs[0].duration.text);
          setDistance("預計車程：" + result.routes[0].legs[0].distance.text);

          // 放置 Marker
          addMarker(
            map,
            result.routes[0].legs[0].start_location,
            location.from.name
          );
          addMarker(
            map,
            result.routes[0].legs[0].end_location,
            location.to.name
          );
        } else {
          console.log("繪製錯誤" + status);
        }
      });
    } else {
      console.log("轉換錯誤");
    }
  };

  // 2022-07-12 PG
  // 地址轉經緯度
  // addr：地址
  // return：{}
  const addrToGeocode = async (addr) => {
    const geocoder = new google.maps.Geocoder();
    let geocoderStatus;
    let geocode = {};
    let errMsg = "";
    await geocoder.geocode({ address: addr }, function (results, status) {
      if (status == "OK") {
        geocoderStatus = true;
        geocode = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        };
      } else {
        geocoderStatus = false;
        errMsg = "ERROR：" + status;
      }
    });
    return {
      status: geocoderStatus,
      geocode: geocode,
      errMsg: errMsg,
    };
  };

  // 2022-07-12 PG
  // 設定 Marker
  // map：{}，google.maps.Map
  // position：{}，經緯度
  // name：文字框內容
  const addMarker = (map, position, name) => {
    const marker = new google.maps.Marker({
      position: position,
      map: map,
      animation: google.maps.Animation.DROP,
    });

    // 設定文字框
    const infowindow = new google.maps.InfoWindow({
      content: "<h5>" + name + "</h5>",
      maxWidth: 200,
    });

    // 預設直接開啟文字框
    infowindow.open(map, marker);
  };

  return (
    <>
      <div className="mx-5  mb-5">
        <p
          id="referenceRoute"
          style={textStyle}
          className="text-primary fw-bold"
        >
          {referenceRout}
        </p>
        <p id="distance" style={textStyle}>
          {distance}
        </p>
        <p id="duration" style={textStyle}>
          {duration}
        </p>
        <div
          id={mapId}
          style={{ width: "500px", height: "500px", marginTop: "10px" }}
        ></div>
      </div>
    </>
  );
};

export default GoogleMap;
