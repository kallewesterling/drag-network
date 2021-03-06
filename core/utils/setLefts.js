/* eslint no-unused-vars: ["error", { "vars": "local" }] */
'use strict';

window.hostPath = window.location.hostname + window.location.pathname;
window.isLocal = window.hostPath.includes('localhost') ||
                 window.hostPath.includes('127.0.0.1');
window.isProd = window.hostPath.includes('kallewesterling.github.io');

if (isLocal) {
  window.isDev = true;
  window.isProd = false;
  window.leftMargin = '20px';
} else if (isProd) {
  window.isDev = false;
  window.isProd = true;
}

window.addEventListener('resize', () => {
  setLefts();
});

const setLefts = () => {
  if (window.leftMargin) {
    if (!window.settingsmoved) {
      document.querySelector('#settings').style.left = window.leftMargin;
    }
    if (!window.quickEdgeInfomoved) {
      document.querySelector('#quickEdgeInfo').style.left = window.leftMargin;
    }
    return true;
  }
  if (window.innerWidth < 1199.98) {
    if (!window.settingsmoved) {
      document.querySelector('#settings').style.left = `8em`;
    }
    if (!window.quickEdgeInfomoved) {
      document.querySelector('#quickEdgeInfo').style.left = `8em`;
    }
    return true;
  }
  if (!window.settingsmoved) {
    document.querySelector('#settings').style.left = `calc(280px + 3em)`;
  }
  if (!window.quickEdgeInfomoved) {
    document.querySelector('#quickEdgeInfo').style.left = `calc(280px + 3em)`;
  }
  return true;
};

setLefts();
