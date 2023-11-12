let _ENV = process.env;
const commonResponse = (res, status, data = [], msg = "", error = "") => {
  let jsonResponse = {};

  switch (status) {
    case 200:
      jsonResponse = {
        message: msg || "Success",
        data,
      };
      break;
    case 204:
      jsonResponse = {
        message: msg || "No Content Found",
        data,
      };
      break;
    case 400:
      jsonResponse = {
        message: msg || "Bad Data Found",
        error: _ENV["ENV"] === "development" ? error : "",
        data,
      };
      break;
    case 401:
      jsonResponse = {
        message: msg || "Unauthorized",
        data,
      };
      break;
    case 409:
      jsonResponse = {
        message: msg || "Duplicate Record Found.",
        error: _ENV["ENV"] === "development" ? error : "",
        data,
      };
      break;
    case 503:
      jsonResponse = {
        message: msg || "Service Unavailable",
        error: _ENV["ENV"] === "development" ? error : "",
        data,
      };
      break;
    default:
      jsonResponse = {
        message: msg || "Something Went Wrong.",
        error: _ENV["ENV"] === "development" ? error : "",
        data,
      };
      break;
  }
  return res.status(status).json(jsonResponse);
};

module.exports = commonResponse;
