var changeCaseObject = require('change-case-object');

module.exports = {
  takeDefined(parameters) {
    Object.keys(parameters)
      .filter(key => parameters[key] === undefined)
      .forEach(key => delete parameters[key]);

    return changeCaseObject.snakeCase(parameters);
  }
};
