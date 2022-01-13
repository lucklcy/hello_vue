export const debounce = function (fn, delay) {
  let timer = null;
  return function () {
    const context = this;
    const args = arguments;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    }
  };
};

export const throttle = function (fn, delay, time) {
  let prvious = new Date();
  let timer = null;
  return function () {
    const context = this;
    const args = arguments;
    const now = new Date();
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (now.getTime() - prvious.getTime() > time) {
      prvious = now;
      fn.apply(context, args);
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    }
  };
};
