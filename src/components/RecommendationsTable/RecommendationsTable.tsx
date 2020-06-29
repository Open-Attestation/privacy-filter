import React from "react";
import { Data } from "../shared";

interface RecommendationsTableProps {
  data?: Data[];
}

export const RecommendationsTable: React.FunctionComponent<RecommendationsTableProps> = ({ data }) => {
  if (data) {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th className="px-4 py-2">Path</th>
              <th className="px-4 py-2">Value</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              return (
                <tr key={row.path}>
                  <td className="border px-4 py-2">{row.path?.replace(/\./g, " > ")}</td>
                  <td className="border px-4 py-2">
                    <code className="break-words">{row.value}</code>
                  </td>
                  <td className="border px-4 py-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Redact
                    </button>
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
