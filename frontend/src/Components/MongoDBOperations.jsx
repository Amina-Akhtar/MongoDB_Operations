import React, { useState } from "react";
import axios from "axios"
const MongoDBOperations = () => {
  const [selectedOp, setSelectedOp] = useState("insertOne");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState(null);

  const operations = [
    "insertOne",
    "insertMany",
    "find",
    "findOne",
    "find_limit",
    "find_skip",
    "find_sort",
    "distinct",
    "countDocuments",
    "updateOne",
    "updateMany",
    "replaceOne",
    "deleteOne",
    "deleteMany",
    "aggregate",
    "createIndex",
    "dropIndex",
    "getIndexes",
    "findOneAndUpdate",
    "findOneAndDelete",
    "bulkWrite",
    "findOneAndReplace",
    "renameCollection",
    "drop",
    "listCollections",
  ];

  const handleExecute = async () => {
    console.log("Operation:", selectedOp);
    console.log("Input:", inputValue);
    try {
      const response = await axios.post(`http://localhost:5000/${selectedOp}`,
        JSON.parse(inputValue)
      );
      setResult(response.data);
    } catch (err) {
      setResult(err.response?.data || { error: err.message });
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2>MongoDB Operations</h2>

      <select
        value={selectedOp}
        onChange={(e) => setSelectedOp(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", margin: "1rem 0" }}
      >
        {operations.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>

      <textarea
        placeholder="Enter operation data in JSON format"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ width: "100%", height: "150px", padding: "1rem" }}
      />

      <button onClick={handleExecute} style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>
        Execute
      </button>
      {result && (
        <pre>{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
};

export default MongoDBOperations;
