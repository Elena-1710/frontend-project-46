import yaml from 'js-yaml';
import _ from 'lodash';

const formats = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};
const parsers = (data, format) => {
  if (!_.has(formats, format)) {
    throw new Error(`Unknown extension: '${format}'. Supported formats are: ${Object.keys(formats).join(', ')}`);
  }
  return formats[format](data);
};

export default parsers;
