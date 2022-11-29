import isInViewport from './isInViewPort';

const getAdjacentItems = (item: Element, items: NodeListOf<Element>) => {
  let arr: any = [];

  items.forEach((otherItem, position) => {
    if (item != otherItem && isInViewport(otherItem)) {
      arr.push({ position: position, item: otherItem });
    }
  });

  return arr;
};

export default getAdjacentItems;
