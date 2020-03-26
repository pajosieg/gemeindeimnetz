const responseCors = {
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
};

export const response = (statusCode, payload) => {
  return {
    ...responseCors,
    statusCode,
    ...payload
  };
};
