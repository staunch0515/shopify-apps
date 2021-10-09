import React, { useCallback, useState, useEffect } from 'react';
import { ChoiceList } from '@shopify/polaris';

export default function ChoiceInput({ label, value, options, setValue, allowMultiple }) {
  console.log("ChoiceInput 0 ", value);

  const [selected, setSelected] = useState(value ? value.toString().split(",") : []);
  const handleChange = useCallback((value) => {
    console.log("ChoiceInput 11 ", value);
    setSelected(value);
    if (setValue) {
      if (allowMultiple) {
        console.log("ChoiceInput 1 ", value.toString());
        setValue(value.toString());
      } else {
        console.log("ChoiceInput * ", value[0]);
        setValue(value[0]);
      }
    }
  }, []);

  return (
    <ChoiceList
      title={label}
      choices={options}
      allowMultiple={allowMultiple}
      selected={selected}
      onChange={handleChange}
    />
  );
}