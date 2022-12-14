const tablist = document.querySelector('[role="tablist"]');
const tabs = tablist.querySelectorAll('[role="tab"]');

tablist.addEventListener('keydown', changeTabFocus);

tabs.forEach((tab) => {
  tab.addEventListener('click', changeTabPanel);
});

let tabFocus = 0;

function changeTabFocus(evt) {
  const keydownLeft = 37;
  const keydownRight = 39;
  const { keyCode } = evt;

  if (keyCode === keydownLeft || keyCode === keydownRight) {
    tabs[tabFocus].setAttribute('tabIndex', -1);

    if (keyCode === keydownRight) {
      tabFocus++;
      if (tabFocus === tabs.length) tabFocus = 0;
    } else {
      tabFocus--;
      if (tabFocus < 0) tabFocus = tabs.length - 1;
    }

    tabs[tabFocus].setAttribute('tabIndex', 0);
    tabs[tabFocus].focus();
  }
}

function changeTabPanel({ target: targetTab }) {
  const targetPanel = targetTab.getAttribute('aria-controls');
  const targetPicture = targetTab.getAttribute('data-image');

  const tabContainer = targetTab.parentNode;
  const mainContainer = tabContainer.parentNode;

  tabContainer
    .querySelector("[aria-selected='true']")
    .setAttribute('aria-selected', false);
  targetTab.setAttribute('aria-selected', true);

  hideContent(mainContainer, 'article');
  showContent(mainContainer, [`#${targetPanel}`]);

  hideContent(mainContainer, 'picture');
  showContent(mainContainer, [`#${targetPicture}`]);
}

function hideContent(container, selector) {
  container
    .querySelectorAll(selector)
    .forEach((element) => element.setAttribute('hidden', true));
}

function showContent(container, selector) {
  container.querySelector(selector).removeAttribute('hidden');
}
