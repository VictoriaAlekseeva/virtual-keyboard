export default function CreateElem(tag, clName) {
  this.tag = tag;
  this.clName = clName;

  this.createBlock = document.createElement(tag);
  this.createBlock.className = clName;

  return this.createBlock;
}
