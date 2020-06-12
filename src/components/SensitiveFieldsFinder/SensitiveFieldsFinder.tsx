import { WrappedDocument } from "@govtechsg/open-attestation";

export const sensitiveFieldsFinder: any = (document: WrappedDocument) => {
  const recipient = ["nric", "email", "email_address", "phone", "phone_number"];
  const fields = [] as string[];
  const values = [] as string[];

  // Might need to rework this some day to search the entire object
  // sensitiveFields.forEach(function (field: object) {
  //   if (field in data.recipient) {
  //     console.log("recipient.%s exists", field);
  //     detectedFields.push("recipient." + field);
  //     detectedValues.push(data.recipient[field]);
  //   }
  // });
  // Object.entries(document).forEach(([field, value]) => {
  //   // if (value && typeof value === "object") {
  //   //   return search(value); // Recursively search if property contains sub-properties
  //   // }
  //   console.log(field);
  //   if (field in recipient) {
  //     fields.push(field);
  //     values.push(value);
  //   }
  // });
  return { fields, values };
};
