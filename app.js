const elements = ['a', 'abbr', 'acronym', 'address', 'applet', 'area', 'article', 'aside', 'audio', 'b', 'base', 'basefont', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'meta', 'meter', 'nav', 'noframes', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'svg', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr'];

const selectTag = document.querySelector('#select-html-elements');
const parentChildTree = document.querySelector('#pc-r');
const properties = document.querySelector('#props');
let pcTreeData = [];

function createOptionElement(text, value) {
  let option = document.createElement('option');
  option.text = text;
  option.value = value;
  return option;
}

function addOptionsToSelect(selectTag, elements) {
  elements.forEach(function addingElement(element) {
    selectTag.appendChild(createOptionElement(element, element));
  });
}

function getParentChildRelationData(element, name) {
  const result = [{
    e: element,
    name: name
  }];

  while (element !== null) {
    element = Object.getPrototypeOf(element);
    if (element) {
      result.push({
        e: element,
        name: element.constructor.name
      });
    }
  }
  return result.reverse();
}

function createRelationNode(text, i, arr) {
  const node = document.createElement('div');
  const textNode = document.createTextNode(text);

  node.classList.add(...['btn', 'btn-sm', 'btn-secondary', 'btn-block']);
  if (i === 0 || i === arr.length - 1) {
    node.classList.add("bg-danger", "disabled");
  }
  node.appendChild(textNode);
  return node;
}

function createListElement(text) {
  const list = document.createElement('li');
  const textNode = document.createTextNode(text);
  list.appendChild(textNode);
  return list;
}

function createPropertiesElement(text) {
  const parent = document.createElement('div');
  const child = document.createElement('span');
  const textNode = document.createTextNode(text);

  child.classList.add(...['badge', 'badge-info']);
  parent.classList.add('text-center');

  child.appendChild(textNode);
  parent.appendChild(child);
  return parent;
}

function removeChildrenNodes(node) {
  while (node && node.firstChild) {
    node.removeChild(node.lastChild);
  }
}

function setAllProperties(props) {
  removeChildrenNodes(properties);
  props.sort();
  props.forEach((prop) => {
    properties.appendChild(createPropertiesElement(prop));
  });
}

function addElementsClickListeners(singleRelationElement, ele) {
  singleRelationElement.addEventListener('click', function relationElementListener() {
    setAllProperties(Object.keys(ele.e));
  })
}

function arrowElement() {
  const node = document.createElement('div');
  const child = document.createElement('i');

  node.classList.add('text-center', "my-2", "text-secondary");
  child.classList.add(...["fas", "fa-lg", "fa-arrow-up"]);

  node.appendChild(child);
  return node;
}

function createPCRelationElements() {
  pcTreeData.forEach((ele, i, arr) => {
    const singleRelationElement = createRelationNode(ele.name, i, arr);
    if (i !== 0 && i !== arr.length - 1) {
      addElementsClickListeners(singleRelationElement, ele);
    }
    parentChildTree.appendChild(singleRelationElement);
    if (i < arr.length - 1) {
      parentChildTree.appendChild(arrowElement())
    }
  });
}

function changeSelectOption(name) {
  // removeAllElementsClickListeners();
  let element = document.createElement(name);
  pcTreeData = getParentChildRelationData(element, name);
  removeChildrenNodes(parentChildTree);
  createPCRelationElements();
}

// This is programming functionality
addOptionsToSelect(selectTag, elements);
selectTag.addEventListener('change', function changeOption() {
  changeSelectOption(selectTag.value);
})