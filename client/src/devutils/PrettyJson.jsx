import React from "react";

const PrettyJson = (json) => {
  return (
    <div>
      <pre>{JSON.stringify(json, null, 2)}</pre>
    </div>
  );
};

export default PrettyJson;
