import GoogleMap from "../../../../GoogleMap";
import { Button, Popover } from "antd";
import "antd/dist/antd.css";
import "./ActivePackPlaceMapPopover.css";

// 2022-07-12 PG
// 活動包地點的地圖 popover
const ActivePackPlaceMapPopover = (props) => {
  const {
    activePackContent,
    partnershipId,
    partnershipNameFrom,
    partnershipAddrFrom,
    partnershipNameTo,
    partnershipAddrTo,
  } = props;

  return (
    <Popover
      content={
        <GoogleMap
          dataList={{
            mapId: "map" + partnershipId,
            location: {
              from: {
                addr: partnershipAddrFrom,
                name: partnershipNameFrom,
              },
              to: {
                addr: partnershipAddrTo,
                name: partnershipNameTo,
              },
            },
          }}
        />
      }
      title="店家位置"
      placement="rightTop"
    >
      <Button type="text" className="bg-white text-primary fw-bold ms-3 m">
        {activePackContent}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-geo-alt-fill ms-1"
          viewBox="0 0 16 16"
        >
          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
        </svg>
      </Button>
    </Popover>
  );
};

export default ActivePackPlaceMapPopover;
