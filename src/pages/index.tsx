import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

import FilterMenu, { FilterMenuSectionProps } from "@/components/FilterMenu";
import { useContext, useState } from "react";
import {
  FilterSettingsContext,
  FilterSettingsDispatchContext,
  FilterSettingsActionType
} from "@/components/FilterMenu/FilterSettingsContext";

const inter = Inter({ subsets: ["latin"] });

export const MyFilterSection = (props: FilterMenuSectionProps) => {
  const sectionKey = "test";
  const [count, setCount] = useState(0);
  const filterSettings = useContext(FilterSettingsContext);
  const filterSettingsDispatch = useContext(FilterSettingsDispatchContext);

  const handleClick = () => {
      setCount(count + 1);
      let newValues = filterSettings.get(sectionKey) || [];
      newValues.push({ valueId: count.toString(), value: count.toString() });

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

export const MyFilterSection2 = (props: FilterMenuSectionProps) => {
  const sectionKey = "test";
  const filterSettings = useContext(FilterSettingsContext);

  return (
    <div>
      {Array.from(filterSettings.get(sectionKey) ?? []).map((settingsValue) => <div key={settingsValue.valueId}>{settingsValue.value}</div>)}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.center}>
          <FilterMenu>
            <MyFilterSection
              filterSectionId="1"
              filterSectionTitle="Filter 1"
            >
            </MyFilterSection>
            <MyFilterSection2
              filterSectionId="2"
              filterSectionTitle="Filter 2"
            >
            </MyFilterSection2>
          </FilterMenu>
        </div >
      </main >
    </>
  );
}
