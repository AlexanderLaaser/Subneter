import React, { useState } from "react";

function Tab() {
  const [activeTab, setActiveTab] = useState("tab-2");

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="flex justify-center content-center">
        <div className="font-montserrat pt-12 w-full max-w-screen-md">
          <div className="">
            <ul
              className="flex flex-wrap -mb-px text-sm text-center text-zinc-950 border-b border-zinc-950 dark:border-zinc-950"
              id="default-tab"
              data-tabs-toggle="#default-Subnet-calculator-tab"
              role="tablist"
            >
              <li className="me-2" role="presentation">
                <button
                  className={`font-extrabold inline-block p-4 border-b-2 rounded-t-lg hover:border-orange-600 dark:hover:text-orange-600 dark:hover:border-orange-600 ${
                    activeTab === "tab-1" ? "text-blue-600 border-blue-600" : ""
                  }`}
                  id="tab-1"
                  data-tabs-target="#tab-1"
                  type="button"
                  role="tab"
                  aria-controls="tab-1"
                  aria-selected={activeTab === "tab-1"}
                  onClick={() => handleTabClick("tab-1")}
                >
                  Subnet Calculator
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  className={`font-extrabold inline-block p-4 border-b-2 rounded-t-lg hover:border-orange-600 dark:hover:text-orange-600 dark:hover:border-orange-600 ${
                    activeTab === "tab-2" ? "text-blue-600 border-blue-600" : ""
                  }`}
                  id="tab-2"
                  data-tabs-target="#tab-2"
                  type="button"
                  role="tab"
                  aria-controls="tab-2"
                  aria-selected={activeTab === "tab-2"}
                  onClick={() => handleTabClick("tab-2")}
                >
                  JSON
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tab;
