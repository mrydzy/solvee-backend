'use strict';

const tooLongTreeIdRegex = new RegExp('id\\":([0-9]{7})+', 'g');
const availableLangs = [
  'en',
  'pl'
];


function validateTree(treeString) {
  var tree = JSON.parse(treeString);
  if (tree.options.length < 1) { //no nodes
    return false;
  }
  if (tooLongTreeIdRegex.test(treeString)) { //too high, there is an id longer than 6 digits
    return false;
  }

  return true;
}

function validateLanguage(lang) {
  if (availableLangs.indexOf(lang) < 0) { //wrong language
    return false;
  }
  return true;
}

module.exports = {
  validateTree,
  validateLanguage
};
