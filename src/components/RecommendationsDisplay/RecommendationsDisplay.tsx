import React from "react";
import { Data } from "../PrivacyFilter";
import { RecommendationsTable } from "../RecommendationsTable";

interface RecommendationsDisplayProps {
  data?: Data[];
}

export const RecommendationsDisplay: React.FunctionComponent<RecommendationsDisplayProps> = ({ data }) => {
  if (!data) {
    return (
      <>
        ✅ Looks good! It seems like your OpenAttestation file doesn't contain any potentially sensitive information.
        You might still want to review your OpenAttestation contents below though.
      </>
    );
  } else {
    return (
      <div>
        Recommendations 🔍 Looks like we found something... We detected some fields that may potentially reveal
        sensitive information if you were to share this OpenAttestation file publicly.
        <RecommendationsTable data={data} />
      </div>
    );
  }
};
