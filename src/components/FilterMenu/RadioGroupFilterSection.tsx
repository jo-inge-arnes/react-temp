import React, { useContext } from "react";
import { FilterMenuSectionProps } from ".";
import {
  FilterSettingsActionType,
  FilterSettingsContext,
  FilterSettingsDispatchContext,
  FilterSettingsValue,
} from "./FilterSettingsContext";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

export type RadioGroupFilterSectionProps = FilterMenuSectionProps & {
  radios: FilterSettingsValue[];
};

const getDefaultValue = (defaultValues?: FilterSettingsValue[]) => {
  if (defaultValues == null || defaultValues.length === 0) {
    return undefined;
  }
  return defaultValues[0].value;
};

const getSelectedValue = (
  filterkey: string,
  filterSettings: Map<string, FilterSettingsValue[]>,
  defaultValues?: FilterSettingsValue[],
) => {
  return (
    filterSettings.get(filterkey)?.[0].value || getDefaultValue(defaultValues)
  );
};

export const RadioGroupFilterSection = (
  props: RadioGroupFilterSectionProps,
) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = (event.target as HTMLInputElement).value;
    const selectedRadio = props.radios.find(
      (radio) => radio.value === selectedValue,
    );
    const selectedLabel = selectedRadio ? selectedRadio.valueLabel : "";

    if (filterSettings) {
      filterSettingsDispatch({
        type: FilterSettingsActionType.SET_SECTION_SELECTIONS,
        sectionSetting: {
          key: filterKey,
          values: [{ valueLabel: selectedLabel, value: selectedValue }],
        },
      });
    }
  };

  const filterKey = props.filterkey;
  const accordion = props.accordion;
  const filterSettings = useContext(FilterSettingsContext);
  const filterSettingsDispatch = useContext(FilterSettingsDispatchContext);

  return (
    <FormControl>
      {accordion === "false" && (
        <FormLabel id={`filter-section-radio-group-label-${props.sectionid}`}>
          {props.sectiontitle}
        </FormLabel>
      )}
      <RadioGroup
        name={`radio-buttons-group-${props.sectionid}`}
        aria-labelledby={`filter-section-radio-group-label-${props.sectionid}`}
        value={getSelectedValue(
          props.filterkey,
          filterSettings.map,
          props.defaultvalues,
        )}
        onChange={handleChange}
      >
        {props.radios.map((radio) => (
          <FormControlLabel
            key={`${props.sectionid}-radio-${radio.value}`}
            value={radio.value}
            control={<Radio />}
            label={radio.valueLabel}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioGroupFilterSection;
