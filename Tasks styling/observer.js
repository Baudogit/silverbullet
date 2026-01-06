// observer.js - Module ES6
export function initObserver(customStyles, attributesConfig) {
  const style = document.createElement("style");
  style.textContent = customStyles;
  document.head.appendChild(style);

  const ATTRIBUTES_CONFIG = attributesConfig;

  let isFixingGlobal = false;
  let sentinelObserver = null;

  function repairAllAttributes() {
    if (isFixingGlobal) return;
    isFixingGlobal = true;

    document.querySelectorAll(".sb-line-task .sb-atom").forEach((atom) => {
      const atomText = atom.textContent.trim();
      const config = ATTRIBUTES_CONFIG.find((c) => c.name === atomText);

      if (config) {
        atom.setAttribute("data-attr-name", config.name);

        const value = atom.nextElementSibling?.nextElementSibling;
        if (value && value.classList.contains("sb-frontmatter")) {
          const isChecked = value.closest(".cm-task-checked");
          const textValue = value.textContent.trim();

          if (!isChecked) {
            value.setAttribute("data-attr-colored", config.name);
            value.setAttribute("data-attr-value", textValue);
          } else {
            value.removeAttribute("data-attr-colored");
            value.removeAttribute("data-attr-value");
          }
        }
      }
    });

    setTimeout(() => {
      isFixingGlobal = false;
    }, 0);
  }

  function setupAttributeObserver() {
    let sentinelElement = null;

    document.querySelectorAll(".sb-line-task .sb-atom").forEach((atom) => {
      const atomText = atom.textContent.trim();
      const config = ATTRIBUTES_CONFIG.find((c) => c.name === atomText);

      if (config) {
        atom.setAttribute("data-attr-name", config.name);

        const value = atom.nextElementSibling?.nextElementSibling;
        if (value && value.classList.contains("sb-frontmatter")) {
          const isChecked = value.closest(".cm-task-checked");

          if (!isChecked) {
            const textValue = value.textContent.trim();
            value.setAttribute("data-attr-colored", config.name);
            value.setAttribute("data-attr-value", textValue);
            if (!sentinelElement) sentinelElement = value;
          }
        }
      }
    });

    if (sentinelObserver) sentinelObserver.disconnect();

    if (sentinelElement) {
      sentinelObserver = new MutationObserver(() => {
        if (!isFixingGlobal) repairAllAttributes();
      });

      sentinelObserver.observe(sentinelElement, {
        attributes: true,
        attributeFilter: ["data-attr-colored"],
      });
    }
  }

  function initScript() {
    setupAttributeObserver();

    const globalObserver = new MutationObserver((mutations) => {
      let hasNewNodes = false;
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) hasNewNodes = true;
      });
      if (hasNewNodes) setupAttributeObserver();
    });

    globalObserver.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("focus", setupAttributeObserver, true);
  }

  let initialized = false;
  let checkCount = 0;

  const checkInterval = setInterval(() => {
    checkCount++;

    if (window.client && window.client.eventHook) {
      clearInterval(checkInterval);

      const eventHook = window.client.eventHook;
      const listenerMethod =
        eventHook.addLocalListener || eventHook.listen || eventHook.on;

      if (listenerMethod) {
        try {
          listenerMethod.call(eventHook, "system:ready", () => {
            if (!initialized) {
              initialized = true;
              setTimeout(initScript, 100);
            }
          });
        } catch (e) {}
      }
    }

    if (checkCount >= 300) {
      clearInterval(checkInterval);
      if (!initialized) {
        initialized = true;
        initScript();
      }
    }
  }, 50);
}