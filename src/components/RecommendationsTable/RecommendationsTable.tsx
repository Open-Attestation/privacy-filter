import _ from "lodash";
import React from "react";
import Table from "react-bootstrap/Table";

interface RecommendationsTableProps {
  fields?: string[];
  values?: string[];
}

export const RecommendationsTable: React.FunctionComponent<RecommendationsTableProps> = (props) => {
  const list = _.zip(props.fields, props.values);

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Data Field</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {list.map((row) => {
          return (
            <tr key={row[0]}>
              <td>{row[0]}</td>
              <td>
                <code>{row[1]?.split(":")[2]}</code>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
