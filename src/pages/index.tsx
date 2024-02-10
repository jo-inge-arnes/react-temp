import React, { useState, useContext } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import FilterMenu, {FilterMenuSectionProps} from "@/components/FilterMenu";
import { 
  FilterSettingsValue, 
  FilterSettingsActionType, 
  FilterSettingsContext, 
  FilterSettingsDispatchContext
} from "@/components/FilterMenu/FilterSettingsContext";
import { initialize } from "next/dist/server/lib/render-server";

const inter = Inter({ subsets: ["latin"] });

export const MyFilterSection = (props: FilterMenuSectionProps) => {
  const sectionKey = "test";
  const [count, setCount] = useState(0);
  const filterSettings = useContext(FilterSettingsContext);
  const filterSettingsDispatch = useContext(FilterSettingsDispatchContext);

  const handleClick = () => {
    const newCount = count + 1;  
    setCount(newCount);
    const curValues = filterSettings.get(sectionKey) || [];
    const newValues = [...curValues, { valueId: count.toString(), value: count.toString() }];

    filterSettingsDispatch({
      type: FilterSettingsActionType.SET_SECTION_SELECTIONS,
      sectionSetting: {
        key: sectionKey,
        values: newValues
      }
    });
  };

  return (
    <button onClick={() => handleClick()}>Count</button>
  );
}

const initialFilterSelections = () => {
  const initialFilterSelections = new Map<string, FilterSettingsValue[]>();
  initialFilterSelections.set("test", [{ valueLabel: "-1", value: "-100" }]);
  return initialFilterSelections;
}

export default function Home() {
  const handleSelectionChanged = (newFilterSettings: Map<string, FilterSettingsValue[]>, oldFilterSettings: Map<string, FilterSettingsValue[]>) => {
    console.log("Old filter settings: ", oldFilterSettings);
    console.log("New filter settings: ", newFilterSettings);
  };


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <FilterMenu onSelectionChanged={handleSelectionChanged} initialSelections={initialFilterSelections()}>
          <div {...{ sectiontitle: "Header", sectionid: "header", accordion: "false" }}>
            Hei!
          </div>
          <MyFilterSection sectionid="section1" sectiontitle="Section 1" />
        </FilterMenu>
      </main>
    </>
  );
}
