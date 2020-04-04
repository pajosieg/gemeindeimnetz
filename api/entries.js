const { response } = require("./globals/response");
const {
  strapiPostRequest,
  strapiDeleteRequest,
  strapiPutRequest
} = require("./globals/strapiRequest");

const updateEntry = async event => {
  const responseData = await strapiPutRequest(
    "entries/" + event.pathParameters.id,
    event.body
  ).then(response => {
    console.log("responded data", response.data);
    return response.data;
  });

  if (responseData) {
    return response(200, {
      body: JSON.stringify(responseData)
    });
  } else {
    return response(500, {});
  }
};

const deleteEntry = async event => {
  const responseData = await strapiDeleteRequest(
    "entries/" + event.pathParameters.id
  ).then(response => {
    console.log("responded data", response.data);
    return response.data;
  });

  if (responseData) {
    return response(200, {
      body: JSON.stringify(responseData)
    });
  } else {
    return response(500, {});
  }
};

const createEntry = async event => {
  const responseData = await strapiPostRequest("entries", event.body).then(
    response => {
      console.log("responded data", response.data);
      return response.data;
    }
  );

  if (responseData) {
    return response(200, {
      body: JSON.stringify(responseData)
    });
  } else {
    return response(500, {});
  }
};

module.exports = {
  createEntry,
  updateEntry,
  deleteEntry
};
