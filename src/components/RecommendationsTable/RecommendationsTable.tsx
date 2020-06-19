import React from "react";
import {Data} from '../shared';

interface RecommendationsTableProps {
  data?: Data[];
}

export const RecommendationsTable: React.FunctionComponent<RecommendationsTableProps> = ({ data }) => {
  if (data) {
    return (
      <table>
        <thead>
          <tr>
            <th>Path</th>
            <th>Value</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            return (
              <tr key={row.path}>
                <td>
                  <pre>{row.path}</pre>
                </td>
                <td>
                  <code>{row.value}</code>
                </td>
                <td>Remove button</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  return <></>;
};
