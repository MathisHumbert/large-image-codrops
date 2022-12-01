const wrapLines = (arr: HTMLElement[], wrapType: string, wrapClass: string) => {
  arr.forEach((el) => {
    const wrapEl = document.createElement(wrapType);
    // @ts-ignore
    wrapEl.classList = wrapClass;
    el.parentNode!.appendChild(wrapEl);
    wrapEl.appendChild(el);
  });
};

export default wrapLines;
