import type { NextApiRequest, NextApiResponse } from "next";
import { airtableBase } from "../../../lib/airtable-buoni";
import { productsIndex } from "../../../lib/algolia-buoni";
import methods from "micro-method-router";

export default methods({
  async post(req: NextApiRequest, res: NextApiResponse) {
    const { pagesize } = req.query;

    airtableBase("buoni-catalogo")
      .select({
        pageSize: Number(pagesize),
      })
      .eachPage(
        async function (records, fetchNextPage) {
          const objects = records.map((r) => {
            return { objectID: r.id, ...r.fields };
          });
          await productsIndex.saveObjects(objects);

          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
          res
            .status(200)
            .json({ message: "objects have been succesfully saved" });
        }
      );
  },
});
