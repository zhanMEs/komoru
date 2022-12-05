import React from "react";
import "./OrderListDaily.css";
import ActivePackPlaceMapPopover from "./ActivePackPlaceMapPopover/ActivePackPlaceMapPopover";

export default function OrderListDaily(props) {
  console.log(props);
  const { activePactContent } = props;
  console.log(activePactContent); // 0714 aki-印出單日的活動包array (固定3個活動)

  return (
    <>
      {props.activePackId && (
        <div className="OrderListDaily p-2 row">
          <h2 className="pt-3 pb-2">{props.orderItemDate}</h2>
          <ul className="text-secondary col-4">
            <li className="pt-2 pb-2 ">
              <h4>・10:00 - 11:00 美好的早晨</h4>
              <p>　　找個屬於你的小角落享用美味早餐</p>
            </li>
            <li className="pt-2 pb-2 ">
              <h4>・11:00 - 12:00 改變的開始</h4>
              <p>　　前往飯店櫃檯領取過往旅客的回饋</p>
            </li>
            <li className="pt-2 pb-2 ">
              <h4>・12:00 - 14:00 不一樣的用餐體驗</h4>
              <ActivePackPlaceMapPopover
                activePackContent={activePactContent[0].activePackItemContent}
                partnershipId={activePactContent[0].partnershipId}
                partnershipNameTo={activePactContent[0].partnershipName}
                partnershipAddrTo={activePactContent[0].partnershipAddr}
              />
            </li>
          </ul>

          <ul className="text-secondary col-4">
            <li className="pt-2 pb-2 ">
              <h4>・14:00 - 16:00 探索時刻</h4>
              <ActivePackPlaceMapPopover
                activePackContent={activePactContent[1].activePackItemContent}
                partnershipId={activePactContent[1].partnershipId}
                partnershipNameTo={activePactContent[1].partnershipName}
                partnershipAddrTo={activePactContent[1].partnershipAddr}
                partnershipNameFrom={activePactContent[0].partnershipName}
                partnershipAddrFrom={activePactContent[0].partnershipAddr}
              />
            </li>
            <li className="pt-2 pb-2 ">
              <h4>・16:00 - 17:00 Tea Time</h4>
              <ActivePackPlaceMapPopover
                activePackContent={activePactContent[2].activePackItemContent}
                partnershipId={activePactContent[2].partnershipId}
                partnershipNameTo={activePactContent[2].partnershipName}
                partnershipAddrTo={activePactContent[2].partnershipAddr}
                partnershipNameFrom={activePactContent[1].partnershipName}
                partnershipAddrFrom={activePactContent[1].partnershipAddr}
              />
            </li>
            <li className="pt-2 pb-2 ">
              <h4>・17:00 - 18:00 沈澱＆聆聽</h4>
              <p>　　自由活動 / 晚餐 / 與自己對話</p>
            </li>
          </ul>

          <ul className="text-secondary col-4">
            <li className="pt-2 pb-2 ">
              <h4>・21:00 - 23:00 永續傳承</h4>
              <p>　　前往飯店櫃檯留言你今日的觀察及改變</p>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
