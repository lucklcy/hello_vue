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

export const reduceCny = function (num) {
  if (typeof num !== "number") return false;
  // num.replace(/(?=\B(?:\d{3})+\b)(\d{3}(?:\.\d+$)?)/g,',$1');
  const str = `${num}`;
  const intPart =
    str.indexOf(".") > -1 ? str.substring(0, str.indexOf(".")) : str;
  const dotPart =
    str.indexOf(".") > -1 ? str.substring(str.indexOf(".") + 1) : "00";
  const cnyStr = [...intPart].reverse().reduce((prev, cur, index) => {
    prev.push(cur);
    if ((index + 1) % 3 === 0 && index !== intPart.length - 1) {
      prev.push(",");
    }
    return prev;
  }, []);

  return `${cnyStr.reverse().join("")}.${dotPart}`;
};

// console.time("aStart");
// for (let i = 0; i < 100000; i++) {
//   reduceCny(12345678910);
// }
// console.timeEnd("aStart");
// aStart: 101.2919921875 ms

// console.time("bStart");
// for (let i = 0; i < 100000; i++) {
//   `12345678910.00`.replace(/(?=\B(?:\d{3})+\b)(\d{3}(?:\.\d+$)?)/g, ",$1");
// }
// console.timeEnd("bStart");
// bStart: 255.0390625 ms

// 遍历的效率高一些
