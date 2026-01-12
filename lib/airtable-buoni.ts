import Airtable from "airtable";

const airtableBase = new Airtable({
  apiKey: process.env.AIRTABLE_APITOKEN,
}).base(process.env.AIRTABLE_BASEID);

export { airtableBase };
