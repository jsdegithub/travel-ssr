import React, { useState } from "react";
import { Tag } from "antd";
const { CheckableTag } = Tag;

export const FilterTag = (props) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (checked) => {
    setChecked(checked);
  };

  return <CheckableTag {...props} checked={checked} onChange={handleChange} />;
};
