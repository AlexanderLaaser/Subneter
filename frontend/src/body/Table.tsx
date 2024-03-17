import React, { useState } from "react";
import AddButton from "./TableEntries";
import TableHead from "./TableHead";
import JSONField from "./JSONField";

function Tab() {
  const [activeTab, setActiveTab] = useState("json-tab");

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="flex justify-center content-center flex-col">
        <div className="flex justify-center content-center w-full ">
          <div className="w-full font-montserrat pt-12 max-w-screen-md">
            <ul
              className="flex flex-wrap -mb-px text-sm text-center text-zinc-950 border-b border-zinc-950 dark:border-zinc-950"
              id="default-tab"
              data-tabs-toggle="#default-Subnet-calculator-tab"
              role="tablist"
            >
              <li className="me-2" role="presentation">
                <button
                  className={`font-extrabold inline-block p-4 border-b-2 rounded-t-lg hover:border-orange-600 dark:hover:text-orange-600 dark:hover:border-orange-600 ${
                    activeTab === "calculator-tab"
                      ? "text-blue-600 border-blue-600"
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
                  Subnet Calculator
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  className={`font-extrabold inline-block p-4 border-b-2 rounded-t-lg hover:border-orange-600 dark:hover:text-orange-600 dark:hover:border-orange-600 ${
                    activeTab === "json-tab"
                      ? "text-blue-600 border-blue-600"
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
            <TableHead></TableHead>
            <AddButton></AddButton>
          </div>
          <div
            className={`flex flex-col ${
              activeTab !== "json-tab" ? "hidden" : ""
            }`}
            id="json"
            role="tabpanel"
            aria-labelledby="json-tab"
          >
            <JSONField></JSONField>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tab;
