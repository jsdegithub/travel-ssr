import React from "react";
import { FilterTag } from "./FilterTag";
import { Typography, Divider } from "antd";
const { Text } = Typography;

export const Filter = ({ title, tags }) => {
  return (
    <div>
      <Text style={{ marginRight: 40, fontSize: 15, fontWeight: 500 }}>{title} : </Text>
      {tags.map((t, index) => {
        if (index === tags.length - 1)
          return <FilterTag key={`filter${index}`}>{t}</FilterTag>;
        return (
          <span key={`filter${index}`}>
            <FilterTag>{t}</FilterTag>
            <Divider type="vertical" />
          </span>
        );
      })}
    </div>
  );
};
