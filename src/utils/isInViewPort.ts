const isInViewport = (elem: Element) => {
  var bounding = elem.getBoundingClientRect();
  return (
    ((bounding.bottom >= 0 &&
      bounding.bottom <=
        (window.innerHeight || document.documentElement.clientHeight)) ||
      (bounding.top >= 0 &&
        bounding.top <=
          (window.innerHeight || document.documentElement.clientHeight))) &&
    ((bounding.right >= 0 &&
      bounding.right <=
        (window.innerWidth || document.documentElement.clientWidth)) ||
      (bounding.left >= 0 &&
        bounding.left <=
          (window.innerWidth || document.documentElement.clientWidth)))
  );
};

export default isInViewport;
