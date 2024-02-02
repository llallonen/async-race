type TagName = string;
type TagValue = string;
type TagListeners = {
  onclick?: () => void;
  onblur?: () => void;
  onfocus?: () => void;
  oninput?: () => void;
};
export type TagAttributes = {
  class: string;
  listeners?: TagListeners;
  height?: string;
  width?: string;
  viewBox?: string;
  fill?: string;
  id?: string;
  d?: string;
  type?: string;
  value?: string;
};
type TagChildren = Array<DSL>;

export type DSL =
  | [TagName]
  | [TagName, TagAttributes]
  | [TagName, TagValue]
  | [TagName, TagChildren]
  | [TagName, TagAttributes, TagValue]
  | [TagName, TagAttributes, TagChildren]
  | [TagName, TagValue, TagChildren]
  | [TagName, TagAttributes, TagValue, TagChildren];

export type DSLArray = Array<DSL>;
const revealItem = (item) => {
  if (!item) {
    return {
      isAttributes: false,
      isValue: false,
      isChildren: false,
      value: null,
    };
  }

  if (typeof item === 'string') {
    return {
      isAttributes: false,
      isValue: true,
      isChildren: false,
      value: item,
    };
  }

  if (typeof item === 'object' && !Array.isArray(item)) {
    return {
      isAttributes: true,
      isValue: false,
      isChildren: false,
      value: item,
    };
  }

  if (typeof item === 'object' && Array.isArray(item)) {
    return {
      isAttributes: false,
      isValue: false,
      isChildren: true,
      value: item,
    };
  }
};

const forEach = (array, cb) => {
  for (const item of array) {
    cb(item, array);
  }
};

const revealRest = (rest) => {
  const [attributes, value, children] = rest;
  const attrs = revealItem(attributes);
  const val = revealItem(value);
  const childs = revealItem(children);

  const result = {};
  forEach([attrs, val, childs], (item, array) => {
    const values = Object.entries(item);
    const found = values.find((el) => el[1] === true);
    const emptyTag = array.every((obj) => {
      const objEntries = Object.entries(obj);

      return objEntries.every((pair) => pair[1] === false || pair[1] === null);
    });

    if (!found && emptyTag) {
      result.attributes = {};
      result.value = '';
      result.children = [];
      return;
    }

    if (!found) return;

    const [key] = found;

    if (key === 'isAttributes') {
      result.attributes = item.value;
      result.value = '';
      result.children = [];
    }

    if (key === 'isValue') {
      result.attributes = result.attributes;
      result.value = item.value;
      result.children = [];
    }

    if (key === 'isChildren') {
      result.attributes = result.attributes;
      result.value = result.value;
      result.children = parse(item.value);
    }
  });

  return result;
};

const applyAttributesToElement = (attributes, element) => {
  const entries = Object.entries(attributes);

  forEach(entries, (pair) => {
    const [attribute, value] = pair;
    if (attribute === 'Taglisteners') {
      const entries = Object.entries(value);

      forEach(entries, ([listenerName, callback]) => {
        element[listenerName] = callback;
      });
      return;
    }
    element.setAttribute(attribute, value);
  });
};

export const parse = (markup) => {
  const [tagName, ...rest] = markup;

  const isArrayOfArray = markup.every((array) => Array.isArray(array));

  if (isArrayOfArray) {
    const coll = [];
    for (const item of markup) {
      coll.push(parse(item));
    }
    return coll;
  }

  const revealed = revealRest(rest);

  const { attributes, value, children } = revealed;

  let element;
  if (['svg', 'path', 'defs', 'g', 'rect'].includes(tagName)) {
    element = document.createElementNS('http://www.w3.org/2000/svg', tagName);
  } else {
    element = document.createElement(tagName);
  }

  if (attributes) {
    applyAttributesToElement(attributes, element);
  }

  element.innerText = value;
  forEach(children, (child) => {
    element.append(child);
  });

  return element;
};
