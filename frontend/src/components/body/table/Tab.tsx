import React, { useState } from "react";
import Table from "./SubnetsTab";

import JsonField from "./JsonTab";
import { useUserStore } from "../../../store/UserStore";

function Tab() {
  const [activeTab, setActiveTab] = useState("calculator-tab");
  const { userLoginStatus } = useUserStore();

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="flex flex-1 justify-center content-center flex-col font-montserrat ">
        <div className="flex justify-center content-center w-full ">
          <div className="w-full pt-12 ">
            <ul
              className="flex space-x-4 flex-wrap -mb-px text-sm text-center text-zinc-950 border-b border-zinc-950 dark:border-zinc-950"
              id="default-tab"
              data-tabs-toggle="#default-Subnet-calculator-tab"
              role="tablist"
            >
              <li className="me-2" role="presentation">
                <button
                  className={`font-extrabold text-lg inline-block border-b-2 pb-2 rounded-t-lg hover:border-orange-600 dark:hover:text-orange-600 dark:hover:border-orange-600 ${
                    activeTab === "calculator-tab"
                      ? "text-sky-800 border-sky-800"
                      : ""
                  }`}
                  id="calculator-tab"
                  data-tabs-target="#calculator"
                  type="button"
                  role="tab"
                  aria-controls="calculator"
                  aria-selected={activeTab === "calculator-tab"}
                  onClick={() => handleTabClick("calculator-tab")}
                >
                  Subnets
                </button>
              </li>
              {userLoginStatus ? (
                <li className="me-2" role="presentation">
                  <button
                    className={`font-extrabold text-lg inline-block border-b-2 pb-2 rounded-t-lg hover:border-orange-600 dark:hover:text-orange-600 dark:hover:border-orange-600 ${
                      activeTab === "json-tab"
                        ? "text-sky-800 border-sky-800"
                        : ""
                    }`}
                    id="json-tab"
                    data-tabs-target="#json"
                    type="button"
                    role="tab"
                    aria-controls="json"
                    aria-selected={activeTab === "json-tab"}
                    onClick={() => handleTabClick("json-tab")}
                  >
                    JSON
                  </button>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div id="default-tab-content">
          <div
            className={`  ${activeTab !== "calculator-tab" ? "hidden" : ""}`}
            id="calculator"
            role="tabpanel"
            aria-labelledby="calculator-tab"
          >
            <Table />
          </div>
          <div
            className={`flex flex-col ${
              activeTab !== "json-tab" ? "hidden" : ""
            }`}
            id="json"
            role="tabpanel"
            aria-labelledby="json-tab"
          >
            <JsonField></JsonField>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tab;
