"use strict";

const topicNames = {
  en: { sensing: "Sensing", motion: "Motion tracking", signal: "Signal identification" },
  zh: { sensing: "柔性传感", motion: "运动追踪", signal: "信号识别" }
};
let language = new URLSearchParams(window.location.search).get("lang") === "zh" ? "zh" : "en";
const localized = (english, chinese) => language === "en" ? english : chinese;
const list = document.querySelector("#works-list");
const count = document.querySelector(".result-count");
let currentFilter = "all";
let works = [];
let loadFailed = false;

function renderWorks() {
  list.replaceChildren();
  if (loadFailed) {
    const message = document.createElement("p");
    message.className = "source-note";
    message.textContent = localized("The work list could not be loaded. Please refresh the page. For local preview, use an HTTP server.", "成果列表暂时未能加载，请刷新页面。本地预览请使用 HTTP 服务器打开主页。");
    list.append(message);
    count.textContent = localized("Unable to load", "加载失败");
    return;
  }
  const visible = works.filter(work => currentFilter === "all" || (currentFilter === "patent" ? work.type === "patent" : work.topics.includes(currentFilter)));
  for (const work of visible) {
    const article = document.createElement("article");
    article.className = "work";
    const number = document.createElement("span");
    number.className = "work-number";
    number.textContent = String(works.indexOf(work) + 1).padStart(2, "0");
    const content = document.createElement("div");
    const meta = document.createElement("div");
    meta.className = "work-meta";
    const type = document.createElement("span");
    type.className = "type";
    type.textContent = work.type === "paper" ? localized("RESEARCH PAPER", "研究论文") : localized("CHINESE WORK / PATENT DETAILS PENDING", "中文成果 / 专利信息待核实");
    const dot = document.createElement("span");
    dot.className = "meta-dot";
    const topics = document.createElement("span");
    topics.textContent = work.topics.map(topic => topicNames[language][topic]).join(" · ");
    meta.append(type, dot, topics);
    const heading = document.createElement("h3");
    heading.textContent = language === "en" ? work.titleEn || work.title : work.title;
    if (work.type === "paper") heading.lang = "en";
    const description = document.createElement("p");
    description.className = "work-description";
    description.textContent = language === "en" ? work.descriptionEn : work.description;
    content.append(meta, heading, description);
    if (language === "en" && work.titleEn) {
      const original = document.createElement("p");
      original.className = "work-original-title";
      original.lang = "zh-CN";
      original.textContent = work.title;
      content.append(original);
      description.textContent += " English title is a translation of the Chinese original.";
    }
    const link = document.createElement("a");
    link.className = "work-link";
    const query = encodeURIComponent(work.searchTitle || work.title);
    link.href = work.type === "paper" ? `https://scholar.google.com/scholar?q=${query}` : `https://patents.google.com/?q=${query}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "↗";
    link.title = work.type === "paper" ? localized("Search title on Google Scholar", "在 Google Scholar 检索题名") : localized("Search title on Google Patents", "在 Google Patents 检索题名");
    link.setAttribute("aria-label", `${link.title}: ${heading.textContent}`);
    article.append(number, content, link);
    list.append(article);
  }
  count.textContent = localized(`${visible.length} works`, `${visible.length} 项成果`);
}

function applyLanguage() {
  document.documentElement.lang = language === "en" ? "en" : "zh-CN";
  document.querySelectorAll("[data-i18n]").forEach(element => {
    element.textContent = translations[element.dataset.i18n][language];
  });
  document.querySelectorAll("[data-language]").forEach(button => {
    const selected = button.dataset.language === language;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  document.title = localized("Xiaowei Chen · Fujian Normal University", "陈小薇 · 福建师范大学");
  document.querySelector('meta[name="description"]').content = localized(
    "Xiaowei Chen, Lecturer at Fujian Normal University. Research in flexible and fabric sensing, human motion tracking, and specific emitter identification.",
    "陈小薇，福建师范大学讲师。研究成果涉及柔性与织物传感、人体运动追踪及特定辐射源识别。"
  );
  const labels = [
    [".skip-link", "Skip to content", "跳转到正文"],
    [".wordmark", "Xiaowei Chen’s homepage", "陈小薇的个人主页"],
    ["#navigation", "Main navigation", "主导航"],
    [".hero-art", "Abstract illustration of fabric sensing and joint tracking", "柔性织物传感与人体关节追踪的抽象研究示意图"],
    [".filters", "Filter research works", "筛选研究成果"],
    [".back-top", "Back to top", "返回顶部"],
    [".language-switch", "Language", "语言切换"]
  ];
  labels.forEach(([selector, english, chinese]) => document.querySelector(selector).setAttribute("aria-label", localized(english, chinese)));
  document.querySelector(".portrait").alt = localized("Portrait of Xiaowei Chen", "陈小薇的个人照片");
  updateMenuLabel();
  renderWorks();
}

document.querySelectorAll("[data-language]").forEach(button => {
  button.addEventListener("click", () => {
    language = button.dataset.language;
    const url = new URL(window.location.href);
    if (language === "zh") url.searchParams.set("lang", "zh");
    else url.searchParams.delete("lang");
    window.history.replaceState(null, "", url);
    applyLanguage();
  });
});
window.addEventListener("popstate", () => {
  language = new URLSearchParams(window.location.search).get("lang") === "zh" ? "zh" : "en";
  applyLanguage();
});

document.querySelectorAll("[data-filter]").forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach(item => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    renderWorks();
  });
});

const menu = document.querySelector(".menu-button");
const navigation = document.querySelector("#navigation");
function updateMenuLabel() {
  const open = menu.getAttribute("aria-expanded") === "true";
  menu.setAttribute("aria-label", open ? localized("Close navigation", "收起导航") : localized("Open navigation", "展开导航"));
}
function closeMenu() {
  navigation.classList.remove("open");
  menu.setAttribute("aria-expanded", "false");
  updateMenuLabel();
}
menu.addEventListener("click", () => {
  const open = navigation.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
  updateMenuLabel();
});
navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeMenu();
});
document.querySelector("#year").textContent = new Date().getFullYear();
applyLanguage();

fetch("./publications.json")
  .then(response => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then(data => { works = data; renderWorks(); })
  .catch(() => {
    loadFailed = true;
    renderWorks();
  });
