// common方法定义在这里
const urlRegExp = /^((https?:)?\/\/)/;

/**
 * 生成uuid，以作临时id用
 * @param {生成的uuid的长度} len
 * @param {随机的字符范围}} radix
 * @returns 返回uuid字符串
 */
export const uuid = (len, radix) => {
  const chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
  const uuid = [];
  let i = 0;
  let r = 0;
  radix = radix || chars.length;
  if (len) {
    for (i = 0; i < len; i++) {
      uuid[i] = chars[0 | (Math.random() * radix)];
    }
  } else {
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join("");
};
/**
 * 深拷贝数组
 * @param {原对象} source
 * @returns 新的深度拷贝对象
 */
export const deepClone = (source) => {
  if (!source && typeof source !== "object") {
    throw new Error("error arguments", "shallowClone");
  }
  const targetObj = source.constructor === Array ? [] : {};
  for (const keys in source) {
    // eslint-disable-next-line no-prototype-builtins
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === "object") {
        targetObj[keys] = source[keys].constructor === Array ? [] : {};
        targetObj[keys] = deepClone(source[keys]);
      } else {
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
};

/**
 * merge对象
 * @param {*} target
 */
export const merge = (target) => {
  // eslint-disable-next-line no-undef
  for (let i = 1, j = arguments.length; i < j; i++) {
    // eslint-disable-next-line no-undef
    const source = arguments[i] || {};
    for (var prop in source) {
      // eslint-disable-next-line no-prototype-builtins
      if (source.hasOwnProperty(prop)) {
        var value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }
  return target;
};

/**
 * 加载图片promise版本
 * @param {加载图片的url地址} url
 * @returns 返回promise对象
 */
export const preloadImg = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      resolve();
    };
  });
};

/**
 * 转换querystring为对象并返回该对象
 */
export const getUrlParams = () => {
  let query = "";
  if (location.hash.split("?")[1]) {
    query = location.hash.split("?")[1];
  }
  const queryObj = {};
  if (query) {
    const splitArr = query.split("&");
    if (splitArr.length) {
      for (const queryStr of splitArr) {
        const strArr = queryStr.split("=");
        if (strArr[0] !== undefined && strArr[0] !== null) {
          queryObj[strArr[0]] = strArr[1] || "";
        }
      }
    }
  }
  return queryObj;
};
/**
 * 将对象转换为queryString
 * @param {要转换为queryString的对象} obj
 */
export const createSearch = (obj) => {
  let search = "";
  if (typeof obj === "object" && !(obj instanceof Array)) {
    const array = [];
    for (const key of Object.keys(obj)) {
      array.push({
        key: key,
        value: obj[key],
      });
    }
    if (array.length === 0) {
      return search;
    }
    for (let i = 0; i < array.length; i++) {
      const str = i === 0 ? "?" : "&";
      search += str + array[i].key + "=" + encodeURIComponent(array[i].value);
    }
  }
  return search;
};

/**
 * 判断值是否为空
 * @param {要判断的值} val
 * @param {0是否为空}} isZeroNull
 * @returns Boolean
 */
export const isEmpty = (val, isZeroNull = false) => {
  return (
    val === "" || val === null || val === undefined || (isZeroNull && val === 0)
  );
};
/**
 * 判断对象是否非空
 * @param {要判断的值} val
 * @param {0是否为空} isZeroNull
 */
export const isNotEmpty = (val, isZeroNull = false) => {
  return !isEmpty(val, isZeroNull);
};

/**
 * 将日期字符串转成日期
 * 字符串fmt【格式】：yyyy-MM-dd HH:mm:ss 或 yyyy-MM-dd 或者 yyyy-MM-dd HH:mm:ss.ms
 * @param {日期字符串}} str
 */
export const parseDate = (str) => {
  if (typeof str === "string") {
    let results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) *$/);
    if (results && results.length > 3) {
      return new Date(
        parseInt(results[1]),
        parseInt(results[2]) - 1,
        parseInt(results[3])
      );
    }
    results = str.match(
      /^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/
    );
    if (results && results.length > 6) {
      return new Date(
        parseInt(results[1]),
        parseInt(results[2]) - 1,
        parseInt(results[3]),
        parseInt(results[4]),
        parseInt(results[5]),
        parseInt(results[6])
      );
    }
    results = str.match(
      /^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,9}) *$/
    );
    if (results && results.length > 7) {
      return new Date(
        parseInt(results[1]),
        parseInt(results[2]) - 1,
        parseInt(results[3]),
        parseInt(results[4]),
        parseInt(results[5]),
        parseInt(results[6]),
        parseInt(results[7])
      );
    }
  }
  return null;
};

/**
 * 判断变量是否为对象
 * @param {变量} val
 */
export const isObject = (val) => {
  return Object.prototype.toString.call(val) === "[object Object]";
};

/**
 * 判断变量是否为数组
 * @param {变量} val
 */
export const isArray = (val) => {
  return Object.prototype.toString.call(val) === "[object Array]";
};

/**
 * 判断变量是否为数字
 * @param {变量} val
 */
export const isNumber = (val) => {
  return Object.prototype.toString.call(val) === "[object Number]";
};

/**
 * 判断变量是否为undefined
 * @param {变量} val
 */
export const isUndefined = (val) => {
  return Object.prototype.toString.call(val) === "[object Undefined]";
};

/**
 * 判断变量是否为字符串
 * @param {变量} val
 */
export const isString = (val) => {
  return Object.prototype.toString.call(val) === "[object String]";
};

/**
 * 判断变量是否为函数
 * @param {变量} val
 */
export const isFunction = (val) => {
  return Object.prototype.toString.call(val) === "[object Function]";
};

/**
 * 判断变量是否为正则表达式
 * @param {变量} val
 */
export const isRegExp = (val) => {
  return Object.prototype.toString.call(val) === "[object RegExp]";
};

/**
 * 判断变量是否为boolean类型
 * @param {变量} val
 */
export const isBoolean = (val) => {
  return Object.prototype.toString.call(val) === "[object Boolean]";
};

/**
 * 判断字符串是否为合法的url
 * @param {url字符串} str
 */
export const isValidUrl = (str) => {
  return urlRegExp.test(str);
};

// 处理sessionStorage OR loaclStorage 处理浏览器本利存储
export const storageSet = (storgeType, key, val) => {
  if (storgeType === "session") {
    window.sessionStorage && window.sessionStorage.setItem(key, val);
  } else if (storgeType === "local") {
    window.localStorage && window.localStorage.setItem(key, val);
  }
};

export const storageGet = (storgeType, key) => {
  if (storgeType === "session") {
    if (window.sessionStorage) {
      return window.sessionStorage.getItem(key);
    }
  } else if (storgeType === "local") {
    if (window.localStorage) {
      return window.localStorage.getItem(key);
    }
  }
};

export const storageRemove = (storgeType, key) => {
  if (storgeType === "session") {
    if (window.sessionStorage) {
      return window.sessionStorage.removeItem(key);
    }
  } else if (storgeType === "local") {
    if (window.localStorage) {
      return window.localStorage.removeItem(key);
    }
  }
};

// 不区分大小写字符串比较 String compare
export const caseInsensitiveStringCompare = (compareA, compareB) => {
  return (compareA + "").toLowerCase() === (compareB + "").toLowerCase();
};

// px转vw
export const pxToVw = (size, designWidth = 375) => {
  return ((size * 1.0 * 100) / designWidth).toFixed(2) + "vw";
};

// px转vh
export const pxToVh = (size, designWidth = 667) => {
  return ((size * 1.0 * 100) / designWidth).toFixed(2) + "vh";
};

/*
 **获取当前URL相对路径的方法
 **idx 为路径的第几个值
 **（1代表第一个，2代表第二个 以此类推）
 */
export const getUrlRelativePath = (idx, urlParam) => {
  const url = urlParam || document.location.toString();
  const arrUrl = url.split("//");
  const start = arrUrl[1].indexOf("/");
  let relUrl = arrUrl[1].substring(start); // stop省略，截取从start开始到结尾的所有字符
  if (relUrl.indexOf("?") !== -1) {
    relUrl = relUrl.split("?")[0];
  }
  if (relUrl.indexOf("#") !== -1) {
    relUrl = relUrl.split("#")[0];
  }
  const relUrlArr = relUrl.split("/");
  return relUrlArr[idx];
};

// 获取cookie
export const getCookie = (name) => {
  const arr = document.cookie.match(
    new RegExp("(^| )" + name + "=([^;]*)(;|$)")
  );
  if (arr != null) {
    return unescape(arr[2]);
  } else {
    return null;
  }
};

// 下载文件
export const exportFile = (blob, fileName) => {
  fileName = decodeURIComponent(fileName);
  fileName = fileName.indexOf(".") > -1 ? fileName : `${fileName}.xlsx`;
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.setAttribute("download", fileName); // 自定义下载文件名（如exemple.txt）
  document.body.appendChild(link);
  link.click();
};

export const exportFileFormUrl = (url, fileName) => {
  fileName = decodeURIComponent(fileName);
  fileName = fileName.indexOf(".") > -1 ? fileName : `${fileName}.xlsx`;
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.setAttribute("download", fileName); // 自定义下载文件名（如exemple.txt）
  document.body.appendChild(link);
  link.click();
};

export const handleFile = (e) => {
  const file = e.files[0];
  const blob = URL.createObjectURL(file);
  const img = document.getElementByTagName("img")[0]; // document.createElement('img')
  img.src = blob;
  img.onload = function (e) {
    URL.revokeObjectURL(this.src); // 释放createObjectURL创建得对象
  };
};

// 去掉所有空格
export const trim = (val) => {
  return val.toString().replace(/[\s ]+/g, "");
};

export const fakeAElementToUrl = (url) => {
  if (url) {
    const targetElm = document.createElement("a");
    targetElm.setAttribute("href", url);
    targetElm.click();
  }
};

export const calcTableContainerHeight = (
  pageSelector,
  otherHeight,
  ...excludeSelectors
) => {
  let resultHeight = null;
  const pageElem = document.querySelector(pageSelector);
  resultHeight = pageElem && pageElem.offsetHeight;
  if (excludeSelectors && excludeSelectors.length > 0) {
    excludeSelectors.forEach((item) => {
      const itemElem = pageElem.querySelector(item);
      const itemHeight = (itemElem && itemElem.offsetHeight) || 0;
      resultHeight -= itemHeight;
    });
  }
  if (otherHeight) resultHeight -= otherHeight;
  return resultHeight;
};
