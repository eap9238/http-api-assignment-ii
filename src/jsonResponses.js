const users = {};

const respondJSON = (request, response, status, object) => {
  // send response with json object
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

// function to respond without json body
// takes request, response and status code
const respondJSONMeta = (request, response, status) => {
  // send response without json object, just headers
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

// function to show not found error
const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
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

// get meta user object
// should calculate a 200
const getUsersMeta = (request, response) => respondJSONMeta(request, response, 200);

// function just to update our object
const addUser = (request, response, body) => {
  const responseJSON = { message: 'Name and age are both required.' };

  if (!body.name || !body.age) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  if (!users[body.name]) {
    //console.dir('making account');
    const status = 201;

    users[body.name] = {
      name: body.name,
      age: body.age,
    };

    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, status, responseJSON);
  }
  //console.dir('updating account');
  const status = 204;
  users[body.name].age = body.age;

  responseJSON.message = 'Updated Successfully';

  return respondJSON(request, response, status, responseJSON);
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
  notFound,
  getUsersMeta,
  notFoundMeta,
};
