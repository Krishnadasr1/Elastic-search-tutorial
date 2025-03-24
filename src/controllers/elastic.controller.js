import prisma from "../config/prismaClient.js";
import elasticClient from "../config/elasticsearchClient.js";

export const createApi = async (req, res) => {
  try {
    const validatedData = (req.body);

    const result = await prisma.$transaction(async (prisma) => {
      
      const newData = await prisma.yourmodel.create({
        data: {
        },
      });

      await elasticClient.index({
        index: "",
        id: id,
        body: {
          //data
        },
      });

      return { newData };
    });

    return res.status(201).json({
      message: "success",
    });

  } catch (error) {
    console.error("Error", error);
    return res.status(400).json({ error: error.message });
  }
};


export const searchApi = async (req, res) => {
  try {
    const { query } = req.query;

    const esQuery = {
      index: "model",
      body: {
        query: {
          bool: {
            must: query
              ? [
                  {
                    bool: {
                      should: [
                        { match_phrase_prefix: { field: query } }, // Autocomplete
                        { match: { field: { query, fuzziness: "AUTO" } } }, // Fuzzy search
                        { match: { field: { query, fuzziness: "AUTO" } } },
                        { match: { field: { query, fuzziness: "AUTO" } } },
                        { match: { field: { query, fuzziness: "AUTO" } } },
                      ],
                      minimum_should_match: 1,
                    },
                  },
                ]
              : [],
            filter: [],
          },
        },
        sort: [],
      },
    };

    if (field) esQuery.body.query.bool.filter.push({ term: { field } });
    if (sortBy) {
      esQuery.body.sort.push({ [sortBy]: { order: order || "desc" } });
    }

    const { hits } = await elasticClient.search(esQuery);

    return res.json({ data });
  } catch (error) {
    console.error("Error searching:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};


export const updateApi = async (req, res) => {
  try {

    const validatedData = (req.body);

  
    const data = await prisma.model.update({
      where: { id },
      data: {},
    
    });


    // 🔹 Update Elasticsearch Index with Course + Videos
    await elasticClient.update({
      index: "model",
      id: id,
      body: {
        doc: {

        },
      },
    });

    return res.json({ message: "updated successfully"});
  } catch (error) {
    console.error("Error updating", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};


export const deleteApi = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await prisma.model.findUnique({
      where: { id },
    });


    await elasticClient.delete({
      index: "model",
      id,
    });

    return res.json({ message: "deleted successfully" });
  } catch (error) {
    console.error("Error deleting", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};