import { Data } from "../PrivacyFilter";

export const sensitiveFieldsFinder: any = (document: Data[]) => {
  const paths = ["nric", "email", "email_address", "phone", "phone_number"];
  const sensitiveFields = [] as Data[];

  document.forEach((data) => {
    // Applying our sensitive fields checker rules here
    paths.forEach((path) => {
      if (data.path?.includes(path)) {
        sensitiveFields.push(data);
      }
    });
  });

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
  return sensitiveFields;
};
