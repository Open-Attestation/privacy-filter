import { obfuscateDocument, WrappedDocument } from "@govtechsg/open-attestation";
import { saveAs } from "file-saver";
import React from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ReactJson from "react-json-view";
import { RecommendationsTable } from "../RecommendationsTable";
import { sensitiveFieldsFinder } from "../SensitiveFieldsFinder";

interface DocumentViewerProps {
  document?: WrappedDocument;
  fileName?: string;
}

export const DocumentViewer: React.FunctionComponent<DocumentViewerProps> = ({ document, fileName }) => {
  if (document) {
    const data = document.data;
    const sensitiveFields = sensitiveFieldsFinder(data);
    console.log(sensitiveFields);

    const download = () => {
      const redacted = obfuscateDocument(document, sensitiveFields);
      const blob = new Blob([JSON.stringify(redacted, null, 2)], {
        type: "application/json",
      });
      saveAs(blob, fileName);
    };
  }
  //   // const DisplayRecommendations = () => {
  //   //   if (!data) {
  //   //     return <></>;
  //   //   }
  //   //   if (detectedFields.length) {
  //   //     return (
  //   //       <Card className="mb-4">
  //   //         <Card.Header>My Recommendations</Card.Header>
  //   //         <Card.Body>
  //   //           <Alert variant="warning">
  //   //             <Alert.Heading>🔍 Looks like we found something...</Alert.Heading>
  //   //             We detected some fields that may potentially reveal sensitive information if you were to share this
  //   //             OpenAttestation file publicly. Your OpenAttestation file is still valid even though certain fields have
  //   //             been filtered. If you want to know how it works,&nbsp;
  //   //             <a href="https://docs.opencerts.io/v1/appendix_data_obfuscation.html" target="_blank">
  //   //               check the documentation here
  //   //             </a>
  //   //             .
  //   //           </Alert>

  //   //           <RecommendationsTable data={data} fields={detectedFields} values={detectedValues} />
  //   //           <Button onClick={download} className="mt-2" variant="success">
  //   //             Redact
  //   //           </Button>
  //   //         </Card.Body>
  //   //       </Card>
  //   //     );
  //   //   } else {
  //   //     return (
  //   //       <Card className="mb-4">
  //   //         <Card.Header>My Recommendations</Card.Header>
  //   //         <Card.Body>
  //   //           <Alert variant="success">
  //   //             <Alert.Heading>✅ Looks good!</Alert.Heading>
  //   //             It seems like your OpenAttestation file doesn't contain any potentially sensitive information. You might
  //   //             still want to review your OpenAttestation contents below though.
  //   //           </Alert>
  //   //         </Card.Body>
  //   //       </Card>
  //   //     );
  //   //   }
  //   // };
  //   // return (
  //   //   <>
  //   //     <DisplayRecommendations />
  //   //     <Card>
  //   //       <Card.Header>OpenAttestation Document Viewer</Card.Header>
  //   //       <Card.Body>
  //   //         <ReactJson src={data} collapseStringsAfterLength={100} />
  //   //       </Card.Body>
  //   //     </Card>
  //   //   </>
  //   // );
  // } else {
  return (
    <Card>
      <Card.Header>OpenAttestation Document Viewer</Card.Header>
      <Card.Body>
        <Card.Text>No document found.</Card.Text>
      </Card.Body>
    </Card>
  );
  // }
};
