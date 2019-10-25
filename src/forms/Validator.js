import ValidatorFactory from 'validatorjs';

function registerCustomAliases(validator, rules, aliases) {
  const attributeNames = {};

  for (const attr in rules) {
    const alias = attr in aliases ? aliases[attr] : attr;
    attributeNames[attr] = alias;
  }

  validator.setAttributeNames(attributeNames);
}

export default function Validator(data, rules, options = {}) {
  const validation = new ValidatorFactory(data, rules);

  if (options.aliases) {
    registerCustomAliases(validation, rules, options.aliases);
  }

  let errors = {};
  if (validation.fails()) {
    errors = validation.errors.errors;
  }

  return {
    errors,
    validation,
  };
}
