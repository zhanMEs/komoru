import React, { useState, useEffect } from "react";
import DemoColumnOccupancyRate from "./DemoColumnOccupancyRate";
import DemoLineRoomTurnover from "./DemoLineRoomTurnover";
import DemoPieParticipate from "./DemoPieParticipate";
import DemoPieExam from "./DemoPieExam";
import DemoPieActivityType from "./DemoPieActivityType";
import DemoLiquidCoupon from "./DemoLiquidCoupon";
import DemoLiquidFeedback from "./DemoLiquidFeedback";
import BackstageLoding from "../../../../components/BackstageLoading";
function DashboardChartsSouth({ dateData,setTitleArea }) {
  /*20220707 YN
  南區報表資料初始化*/
  const [southData, setSouthData] = useState();

  /*20220707 YN
 報表資料載入過程初始化*/
  const [loading, setLoading] = useState(false);

/*20220709 YN
   區域標題狀態設定*/
   useEffect(() => {
    setTitleArea("南部");
  }, []);


  /*20220707 YN
取後端南區報表資料*/
  useEffect(() => {
    const newContacts = {
      cityId: "3",
      dateRange: `${dateData.dateRange}`,
    };
    setLoading(false)
    fetch("http://localhost:5000/dashboard/getDashboardDataListByCondition", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(newContacts),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.dataList.IsOrderAfterExamItem);
        setSouthData(data.dataList);
        setLoading(true)
      })
      .catch((e) => {
        console.error(e);
      });
  }, [dateData]);
  return (
    <>
      <div className="mx-5 me-5">
        <div className="row ms-5 me-5">
          {loading ? (
            <>
              <div
                className="p-5 "
                style={{
                  backgroundColor: "white",
                  boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                }}
              >
                <div className="pb-3">
                  <p className="km-modal-report-title">入住率</p>
                </div>
                {southData && (
                  <DemoColumnOccupancyRate southData={southData} />
                )}
              </div>

              <div
                className="mt-5 p-5"
                style={{
                  backgroundColor: "white",
                  boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                }}
              >
                <div className="pb-3">
                  <p className="km-modal-report-title">房型營業額</p>
                </div>
                {southData && <DemoLineRoomTurnover southData={southData} />}
              </div>

              <div className="row mb-5 mt-2 g-0">
                <div
                  className="col-lg-4 col-md-12 pt-lg-3 pe-lg-3 pt-md-0 pe-md-0"
                  // style={{
                  //   padding: "20px 20px 0 0",
                  // }}
                >
                  <div
                    className="mt-3"
                    style={{
                      backgroundColor: "white",
                      boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                    }}
                  >
                    <div className="pt-3 ps-3">
                      <p className="km-modal-report-title">參與活動率</p>
                    </div>

                    {southData && (
                      <DemoPieParticipate southData={southData} />
                    )}
                  </div>
                </div>
                <div
                  className="col-lg-4 col-md-12 pt-lg-3 pt-md-0"
                  style={{
                    padding: "20px 0 0 0",
                  }}
                >

                  <div
                    className="mt-3"
                    style={{
                      backgroundColor: "white",
                      boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                    }}
                  >
                    <div className="pt-3 ps-3">
                      <p className="km-modal-report-title">測驗後下訂率</p>
                    </div>
                    {southData && <DemoPieExam southData={southData} />}
                  </div>
                </div>

                <div
                  className="col-lg-4 col-md-12 pt-lg-3 ps-lg-3 pt-md-0 ps-md-0"
                  // style={{
                  //   padding: "20px 0 0 20px",
                  // }}
                >

                  <div
                    className="mt-3"
                    style={{
                      backgroundColor: "white",
                      boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                    }}
                  >
                    <div className="pt-3 ps-3">
                      <p className="km-modal-report-title">活動類型</p>
                    </div>
                    {southData && (
                      <DemoPieActivityType southData={southData} />
                    )}
                  </div>
                </div>
              </div>
              <div className="row mb-5 g-0">
                <div
                  className="col-lg-6 col-md-12 pe-md-0 pe-lg-3"
                  // style={{
                  //   padding: "0 20px 0 0",
                  // }}
                >
                  <div
                    className="pb-lg-5"
                    style={{
                      backgroundColor: "white",
                      boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                    }}
                  >
                    <div className="pt-3 ps-4">
                      <p className="km-modal-report-title">優惠卷使用率</p>
                    </div>
                    {southData && <DemoLiquidCoupon southData={southData} />}
                  </div>
                </div>
                <div
                  className="col-lg-6 col-md-12 ps-md-0  ps-lg-3"
                  // style={{
                  //   padding: "0 0 0 20px",
                  // }}
                >
                  <div
                    className="pb-lg-5 "
                    style={{
                      backgroundColor: "white",
                      boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                    }}
                  >
                    <div className="pt-3 ps-4 mt-lg-0 mt-md-3">
                      <p className="km-modal-report-title">回饋率</p>
                    </div>
                    {southData && (
                      <DemoLiquidFeedback southData={southData} />
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="d-flex justify-content-center">
              <BackstageLoding />
            </div>
          )}
        </div>
      </div>


    </>
  );
}

export default DashboardChartsSouth;
