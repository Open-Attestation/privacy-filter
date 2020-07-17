import React from "react";
import { Data } from "../shared";

interface RecommendationsTableProps {
  data?: Data[];
}

export const RecommendationsTable: React.FunctionComponent<RecommendationsTableProps> = ({ data }) => {
  if (data) {
    return (
      <div>
        <table className="table-fixed w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Path</th>
              <th className="px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              return (
                <tr key={row.path}>
                  <td className="border px-4 py-2">
                    <span className="break-words">{row.path}</span>
                  </td>
                  <td className="border px-4 py-2">
                    <pre className="truncate">{row.value}</pre>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  return <></>;
};
