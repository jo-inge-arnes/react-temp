import { UseQueryResult } from "@tanstack/react-query";
import { useQueryParam } from "use-query-params";
import { Description, RegisterName, Indicator, OptsTu } from "types";
import { mainQueryParamsConfig } from "../../app_config";

import LEGEND from "../TargetLevels";
// import { MedicalFields } from "../MedicalFields";
import { IndicatorTable } from "../IndicatorTable";
import { useMedicalFieldsQuery } from "../../helpers/hooks";
import styles from "./registerPage.module.css";

import FilterMenu from "../FilterMenu";
import RadioGroupFilterSection from "../FilterMenu/RadioGroupFilterSection";
import SelectedFiltersSection from "../FilterMenu/SelectedFiltersSection";

//
import { maxYear, minYear, defaultYear } from "../../app_config";

import { mathClamp, validateTreatmentUnits } from "../../helpers/functions";
import { useUnitNamesQuery } from "../../helpers/hooks";
import { FilterSettingsValue } from "../FilterMenu/FilterSettingsContext";

//

interface AggData {
  nation: {
    filtered_by_unit: Indicator[];
    filtered_by_year: Indicator[];
  };
  filtered_by_unit: Indicator[];
  filtered_by_year: Indicator[];
  all_filtered_by_year: Indicator[];
}

export interface GraphData {
  agg_data: AggData;
  description: Description[];
}

export interface IndPerReg {
  registry_name: string;
  number_ind: number;
  indicators: Description[];
}

export interface Props {
  context: string;
  optstu: OptsTu[] | [];
  registerNames: RegisterName[];
  treatment_units: string[];
  selected_year: number;
  colspan: number;
  selection_bar_height: number | null;
  legend_height: number | null;
  update_legend_height(height: any): void;
}

interface MedicalFieldObject {
  shortName: string;
  name: string;
  registers: string[];
}

const Main = (props: Props) => {
  const {
    context,
    registerNames,
    treatment_units,
    selected_year,
    colspan,
    selection_bar_height,
    legend_height,
    update_legend_height,
  } = props;

  const [show_level_filter, update_show_level_filter] = useQueryParam<
    string | undefined
  >("level", mainQueryParamsConfig.level);
  const [clicked_med_field, update_clicked_med_field] = useQueryParam<
    string | undefined
  >("indicator", mainQueryParamsConfig.indicator);

  const queryContext = { context: "caregiver", type: "ind" };

  const unitNamesQuery: UseQueryResult<any, unknown> = useUnitNamesQuery(
    "all",
    queryContext.context,
    queryContext.type,
  );

  const optstu: OptsTu[] | [] = unitNamesQuery.data?.opts_tu ?? [];

  // Added for filter menu year selector
  const [selectedYear, updateSelectedYear] = useQueryParam(
    "year",
    mainQueryParamsConfig.year,
  );

  const validatedSelectedYear = mathClamp(
    selected_year || defaultYear,
    minYear,
    maxYear,
  );

  const validatedTreatmentUnits = validateTreatmentUnits(
    treatment_units as string[],
    optstu,
  );

  const validYears = Array.from(Array(maxYear - minYear + 1).keys()).map(
    (v) => minYear + v,
  );

  // END: Added for filter menu year selector
  const medicalFieldsQuery: UseQueryResult<any, unknown> =
    useMedicalFieldsQuery();
  const registerList = registerNames.map((d: RegisterName) => d.rname);

  if (medicalFieldsQuery.isLoading) {
    return null;
  }
  const medicalFields: MedicalFieldObject[] = medicalFieldsQuery.data;
  const selectedMedicalField: string[] =
    (clicked_med_field ?? "all") === "all"
      ? registerList
      : medicalFields
          .filter(
            (field: MedicalFieldObject) =>
              field.shortName === clicked_med_field,
          )
          .flatMap((field: MedicalFieldObject) => field.registers);

  const orderedRegisterList: RegisterName[] = Array.from(
    new Set(
      medicalFields.flatMap((field: MedicalFieldObject) =>
        field.registers.sort(),
      ),
    ),
  )
    .map((reg) => {
      return registerNames.filter((regLit) => regLit.rname === reg)[0];
    })
    .filter((data) => data);

  const getLevelLabel = (level: string | undefined) => {
    if (level) {
      switch (level) {
        case "H":
          return "Høy måloppnåelse";
        case "M":
          return "Moderat måloppnåelse";
        case "L":
          return "Lav måloppnåelse";
        default:
          return "Alle måloppnåelser";
      }
    } else {
      return "Alle måloppnåelser";
    }
  };

  return (
    <>
      {/* <LEGEND
        update_show_level_filter={update_show_level_filter}
        show_level_filter={show_level_filter}
        selection_bar_height={selection_bar_height}
        update_legend_height={update_legend_height}
        width="undefined"
      /> */}
      <div className={styles.contentContainer}>
        <div className={styles.medFieldContainer}>
          <div
            style={{
              top: `${(legend_height ?? 0) + (selection_bar_height ?? 0)}px`,
            }}
          />
          <FilterMenu
            onSelectionChanged={(newSettings, oldSettings, action) => {
              switch (action.sectionSetting.key) {
                case "indikatorer":
                  {
                    const sectionValues = newSettings.map.get("indikatorer");
                    if (
                      sectionValues !== undefined &&
                      sectionValues.length === 1
                    ) {
                      update_clicked_med_field(sectionValues[0].value);
                    }
                  }
                  break;

                case "year":
                  {
                    const sectionValues = newSettings.map.get("year");
                    if (
                      sectionValues !== undefined &&
                      sectionValues.length === 1
                    ) {
                      updateSelectedYear(parseInt(sectionValues[0].value));
                    }
                  }
                  break;

                case "level":
                  {
                    const sectionValues = newSettings.map.get("level");
                    if (
                      sectionValues !== undefined &&
                      sectionValues.length === 1
                    ) {
                      const level = sectionValues[0].value;
                      if (level !== "")
                        update_show_level_filter(sectionValues[0].value);
                      else update_show_level_filter(undefined);
                    } else {
                      update_show_level_filter(undefined);
                    }
                  }
                  break;

                default:
                  break;
              }
            }}
            initialSelections={
              new Map<string, FilterSettingsValue[]>([
                [
                  "level",
                  [
                    {
                      value: show_level_filter ?? "",
                      valueLabel: getLevelLabel(show_level_filter),
                    },
                  ],
                ],
              ])
            }
          >
            <SelectedFiltersSection
              accordion="false"
              filterkey="selectedfilters"
              sectionid="selectedfilters"
              sectiontitle="Valgte filtre"
            />
            <RadioGroupFilterSection
              defaultvalues={[
                {
                  value: validatedSelectedYear.toString(),
                  valueLabel: validatedSelectedYear.toString(),
                },
              ]}
              filterkey="year"
              radios={[
                ...validYears.map((field) => {
                  return {
                    value: field.toString(),
                    valueLabel: field.toString(),
                  };
                }),
              ]}
              sectionid="year"
              sectiontitle="År"
            />
            <RadioGroupFilterSection
              defaultvalues={[
                {
                  value: "all",
                  valueLabel: "Alle indikatorer",
                },
              ]}
              filterkey="indikatorer"
              radios={[
                {
                  value: "all",
                  valueLabel: "Alle indikatorer",
                },
                ...medicalFields.map((field) => {
                  return { value: field.shortName, valueLabel: field.name };
                }),
              ]}
              sectionid="indikatorer"
              sectiontitle="Indikatorer"
            />
            <RadioGroupFilterSection
              defaultvalues={[{ value: "", valueLabel: "alle" }]}
              // TODO: Legg til støtte for initialselection i FilterMenuSection
              // initialselections={
              //   new Map<string, FilterSettingsValue[]>(
              //     [["level", [{ value: show_level_filter ?? "", valueLabel: "alle"}]]]
              //   )
              // }
              filterkey="level"
              radios={[
                { value: "", valueLabel: getLevelLabel("") },
                { value: "H", valueLabel: getLevelLabel("H") },
                { value: "M", valueLabel: getLevelLabel("M") },
                { value: "v", valueLabel: getLevelLabel("L") },
              ]}
              sectionid="level"
              sectiontitle="Måloppnåelse"
            />
          </FilterMenu>
          {/* <MedicalFields
            medicalFields={medicalFields}
            clicked_med_field={clicked_med_field ?? "all"}
            update_clicked_med_field={update_clicked_med_field}
            selection_bar_height={selection_bar_height ?? 0}
            legend_height={legend_height}
          /> */}
        </div>
        <div className={styles.mainTableContainer}>
          <IndicatorTable
            context={context}
            tableType="allRegistries"
            registerNames={orderedRegisterList}
            unitNames={[...treatment_units, "Nasjonalt"]}
            treatmentYear={selected_year}
            colspan={colspan}
            medicalFieldFilter={selectedMedicalField}
            showLevelFilter={show_level_filter}
            selection_bar_height={selection_bar_height}
            legend_height={legend_height}
            blockTitle={orderedRegisterList.map(
              (d: RegisterName) => d.full_name,
            )}
          />
        </div>
      </div>
    </>
  );
};

export default Main;
