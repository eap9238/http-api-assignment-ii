const users = {};
const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

    // send response with json object
  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

// function to respond without json body
// takes request, response and status code
const respondJSONMeta = (request, response, status) => {
  // object for our headers
  // Content-Type for json
  const headers = {
    'Content-Type': 'application/json',
  };

    // send response without json object, just headers
  response.writeHead(status, headers);
  response.end();
};

// get user object
// should calculate a 200
const getUsers = (request, response) => {
  // json object to send
  const responseJSON = {
    users,
  };

    // return 200 with message
  return respondJSON(request, response, 200, responseJSON);
};

// get meta info about user object
// should calculate a 200
const getUsersMeta = (request, response) =>
// return 200 without message, just the meta data
  respondJSONMeta(request, response, 200)
;

// function just to update our object
const updateUser = (request, response, userParams) => {
  // modifying our dummy object
  // just indexing by time for now
  users[userParams.name].age = userParams.age;

  // return a 201 created status
  return respondJSON(request, response, 204);
};

// function for 404 not found requests with message
const notFound = (request, response) => {
  // create error message for response
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

    // return a 404 with an error message
  respondJSON(request, response, 404, responseJSON);
};

// function just to update our object
const addUser = (request, response, userParams) => {
  if (!userParams.name || !userParams.age) {
    const responseJSON = {
      message: 'Name and age are both required.',
    };

    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  if (users[userParams.name]) {
    updateUser(request, response, userParams);
  } else {
    const newUser = {
      name: userParams.name,
      age: userParams.age,
    };

    users[userParams.name] = newUser;

    // return a 201 created status
    return respondJSON(request, response, 201, newUser);
  }

  return notFound(request, response);
};

// function for 404 not found without message
const notFoundMeta = (request, response) => {
  // return a 404 without an error message
  respondJSONMeta(request, response, 404);
};

// set public modules
module.exports = {
  addUser,
  getUsers,
  getUsersMeta,
  updateUser,
  notFound,
  notFoundMeta,
};
