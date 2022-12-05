const exampleModel = require("../models/_ExampleModel");

// Example
exports.getRainbowCardDataList = async (req, res, next) => {
  await exampleModel
    .getRainbowCardDataList()
    .then((result) => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(result));
    })
    .catch((err) => {
      // 目前不確定這邊要怎改
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
};
