// CSS pour les attributs colorés
const style = document.createElement("style");
style.textContent = `
    .sb-frontmatter[data-attr-colored="date"] { color: cyan !important; }
    .sb-frontmatter[data-attr-colored="statut"] { color: red !important; }
    .sb-frontmatter[data-attr-colored="attrib1"] { color: green !important; }
    .sb-frontmatter[data-attr-colored="attrib2"] { color: orange !important; border: thick solid #8ebf42;}

    .sb-atom[data-attr-name="date"] { color: blue; }
    .sb-atom[data-attr-name="statut"] { color: darkred; font-weight: bold; }
    .sb-atom[data-attr-name="attrib1"] { color: #E52B50; background: none;}
    .sb-atom[data-attr-name="attrib2"] { color: #720B98; background: #B2D2FF;}

    .sb-frontmatter[data-attr-colored="statut"][data-attr-value="hors délai"] {
        background-color: red !important;
        color: white !important;
        padding: 2px 6px !important;
        border-radius: 3px !important;
    }

    .sb-frontmatter[data-attr-colored="statut"][data-attr-value="en cours"] {
        background-color: orange !important;
        color: white !important;
        padding: 2px 6px !important;
        border-radius: 3px !important;
    }

    .sb-frontmatter[data-attr-colored="statut"][data-attr-value="en attente"] {
        background-color: #00C4B0 !important;
        color: white !important;
        padding: 2px 6px !important;
        border-radius: 3px !important;
    }
`;
document.head.appendChild(style);

const ATTRIBUTES_CONFIG = [
  { name: "date", color: "cyan" },
  { name: "statut", color: "red" },
  { name: "attrib1", color: "green" },
  { name: "attrib2", color: "orange" },
];

const STATS_INTERVAL_MS = 30000;
let isFixingGlobal = false;
let sentinelObserver = null;

const stats = {
  elementsTracked: 0,
  mutationsProcessed: 0, // changements repérés sur la sentinelle
  mutationsRepaired: 0, // changements effectués sur toutes les cibles
  lastUpdate: Date.now(),
  startTime: Date.now(),
};

function logStats() {
  const now = Date.now();
  const uptime = ((now - stats.startTime) / 1000).toFixed(1);
  const intervalSeconds = (now - stats.lastUpdate) / 1000;
  const mutationsPerSecond =
    intervalSeconds > 0
      ? (stats.mutationsProcessed / intervalSeconds).toFixed(2)
      : "0.00";
  const repairsPerSecond =
    intervalSeconds > 0
      ? (stats.mutationsRepaired / intervalSeconds).toFixed(2)
      : "0.00";

  console.log("📊 Stats Observer Multi-Attributs:");
  console.log(`  ⏱️  Uptime: ${uptime}s`);
  console.log(`  🎯 Éléments surveillés: ${stats.elementsTracked}`);
  console.log(`  🔄 Mutations traitées: ${stats.mutationsProcessed}`);
  console.log(`  ✔️ Mutations réparées: ${stats.mutationsRepaired}`);
  console.log(`  📈 Mutations/sec: ${mutationsPerSecond}`);
  console.log(`  📉 Réparations/sec: ${repairsPerSecond}`);

  // disponible sur Chrome (selon la version, semble-t-il)
  if (performance.memory) {
    const memMB = (performance.memory.usedJSHeapSize / 1048576).toFixed(2);
    console.log(`  💾 Mémoire JS: ${memMB} MB`);
  }

  stats.mutationsProcessed = 0;
  stats.mutationsRepaired = 0;
  stats.lastUpdate = now;
}

window.attributeColorStats = {
  get: () => stats,
  log: logStats,
  reset: () => {
    stats.mutationsProcessed = 0;
    stats.mutationsRepaired = 0;
    stats.lastUpdate = Date.now();
    stats.startTime = Date.now();
    console.log("✅ Stats réinitialisées");
  },
};

setInterval(logStats, STATS_INTERVAL_MS);

// Réparer tous les attributs en une seule passe
function repairAllAttributes() {
  if (isFixingGlobal) return;

  isFixingGlobal = true;
  let repaired = 0;

  document.querySelectorAll(".sb-line-task .sb-atom").forEach((atom) => {
    const atomText = atom.textContent.trim();
    const config = ATTRIBUTES_CONFIG.find((c) => c.name === atomText);

    if (config) {
      atom.setAttribute("data-attr-name", config.name);

      const value = atom.nextElementSibling?.nextElementSibling;
      if (value && value.classList.contains("sb-frontmatter")) {
        const isChecked = value.closest(".cm-task-checked");
        const currentValue = value.getAttribute("data-attr-colored");
        const textValue = value.textContent.trim();

        if (!isChecked) {
          if (currentValue !== config.name) {
            value.setAttribute("data-attr-colored", config.name);
            repaired++;
          }
          value.setAttribute("data-attr-value", textValue);
        } else if (currentValue) {
          value.removeAttribute("data-attr-colored");
          value.removeAttribute("data-attr-value");
        }
      }
    }
  });

  if (repaired > 0) {
    stats.mutationsRepaired += repaired;
  }

  setTimeout(() => {
    isFixingGlobal = false;
  }, 0);
}

function setupAttributeObserver() {
  let sentinelElement = null;
  stats.elementsTracked = 0;

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
          stats.elementsTracked++;
          if (!sentinelElement) sentinelElement = value;
        }
      }
    }
  });

  if (sentinelObserver) {
    sentinelObserver.disconnect();
  }

  if (sentinelElement) {
    sentinelObserver = new MutationObserver((mutations) => {
      if (isFixingGlobal) return;
      stats.mutationsProcessed += mutations.length;
      repairAllAttributes();
    });

    sentinelObserver.observe(sentinelElement, {
      attributes: true,
      attributeFilter: ["data-attr-colored"],
    });
  }
}

function initScript() {
  console.log(
    "🚀 Initialisation du script Multi-Attributs Color (mode optimisé)",
  );

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

  console.log("✅ Script activé");
  console.log(
    `📋 Attributs: ${ATTRIBUTES_CONFIG.map((c) => `${c.name}/${c.color}`).join(", ")}`,
  );
}

let initialized = false;

console.log("⏳ Attente de SilverBullet...");

let checkCount = 0;
const checkInterval = setInterval(() => {
  checkCount++;

  if (window.client && window.client.eventHook) {
    console.log(`✅ eventHook trouvé après ${checkCount * 50}ms`);
    clearInterval(checkInterval);

    const eventHook = window.client.eventHook;
    const listenerMethod =
      eventHook.addLocalListener || eventHook.listen || eventHook.on;

    if (listenerMethod) {
      try {
        listenerMethod.call(eventHook, "system:ready", () => {
          if (!initialized) {
            console.log("📢 system:ready capturé");
            initialized = true;
            setTimeout(initScript, 100);
          }
        });
      } catch (e) {
        console.log("⚠️ Erreur:", e);
      }
    }
  }

  if (checkCount >= 300) {
    clearInterval(checkInterval);
    if (!initialized) {
      console.log("⚠️ Timeout: initialisation forcée");
      initialized = true;
      initScript();
    }
  }
}, 50);
