// Solution : CSS + Protection active des attributs
const style = document.createElement("style");
style.textContent = `
    .sb-frontmatter[data-attr-colored="date"] {
        color: cyan !important;
    }
    .sb-frontmatter[data-attr-colored="statut"] {
        color: red !important;
    }
    .sb-frontmatter[data-attr-colored="attrib1"] {
        color: green !important;
    }
    .sb-frontmatter[data-attr-colored="attrib2"] {
        color: orange !important;
    }
`;
document.head.appendChild(style);

// Configuration des attributs à surveiller
const ATTRIBUTES_CONFIG = [
  { name: "date", color: "cyan" },
  { name: "statut", color: "red" },
  { name: "attrib1", color: "green" },
  { name: "attrib2", color: "orange" },
];

// Map pour suivre les éléments et leurs observers individuels
const trackedElements = new WeakMap();
const activeObservers = new Map();

// Statistiques de monitoring
const STATS_INTERVAL_MS = 15000; // Modifiable

const stats = {
  elementsTracked: 0,
  mutationsProcessed: 0,
  mutationsRepaired: 0,
  lastUpdate: Date.now(),
  startTime: Date.now(),
};

// Fonction pour afficher les stats
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

  let elementsInDOM = 0;
  activeObservers.forEach((observer, element) => {
    if (document.body.contains(element)) {
      elementsInDOM++;
    }
  });

  console.log("📊 Stats Observer Multi-Attributs:");
  console.log(`  ⏱️  Uptime: ${uptime}s`);
  console.log(`  🎯 Éléments surveillés (total): ${stats.elementsTracked}`);
  console.log(`  ✅ Éléments actifs (dans DOM): ${elementsInDOM}`);
  console.log(`  📦 Observers en mémoire: ${activeObservers.size}`);
  console.log(`  🔄 Mutations traitées: ${stats.mutationsProcessed}`);
  console.log(`  ✔️ Mutations réparées: ${stats.mutationsRepaired}`);
  console.log(`  📈 Mutations traitées/sec: ${mutationsPerSecond}`);
  console.log(`  📉 Mutations réparées/sec: ${repairsPerSecond}`);

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
  cleanup: () => {
    let cleaned = 0;
    activeObservers.forEach((observer, element) => {
      if (!document.body.contains(element)) {
        observer.disconnect();
        activeObservers.delete(element);
        cleaned++;
      }
    });
    console.log(`🧹 ${cleaned} observers nettoyés`);
    logStats();
  },
};

setInterval(() => {
  let cleaned = 0;
  activeObservers.forEach((observer, element) => {
    if (!document.body.contains(element)) {
      observer.disconnect();
      activeObservers.delete(element);
      cleaned++;
    }
  });

  if (cleaned > 0) {
    console.log(`🧹 Auto-nettoyage: ${cleaned} observers déconnectés`);
  }

  logStats();
}, STATS_INTERVAL_MS);

// Fonction pour protéger un élément spécifique
function protectElement(element, attributeName) {
  if (trackedElements.has(element)) {
    const currentAttr = element.getAttribute("data-attr-colored");
    if (currentAttr === attributeName) return;
  }

  element.setAttribute("data-attr-colored", attributeName);

  let isFixing = false;

  const elementObserver = new MutationObserver((mutations) => {
    if (isFixing) return;

    stats.mutationsProcessed += mutations.length;

    mutations.forEach((mutation) => {
      if (mutation.type === "attributes") {
        const currentValue = element.getAttribute("data-attr-colored");

        // LOGS DÉTAILLÉS pour debug
        console.log("🔧 Mutation détectée:", {
          attributeName: attributeName, // L'attribut attendu (ex: "date")
          currentValue: currentValue, // Valeur actuelle de data-attr-colored
          elementText: element.textContent, // Le texte affiché
          elementClasses: Array.from(element.classList), // Toutes les classes CSS
          mutationTarget: mutation.target, // L'élément qui a muté
          attributeChanged: mutation.attributeName, // Quel attribut a changé
          oldValue: mutation.oldValue, // Ancienne valeur (si observée)
          isInDOM: document.body.contains(element), // Encore dans le DOM ?
        });

        if (currentValue !== attributeName) {
          // Remettre le bon attribut
          console.log(`⚠️ Réparation: ${currentValue} → ${attributeName}`);
          stats.mutationsRepaired++;
          isFixing = true;
          element.setAttribute("data-attr-colored", attributeName);
          setTimeout(() => {
            isFixing = false;
          }, 0);
        }
      }
    });
  });

  elementObserver.observe(element, {
    attributes: true,
    attributeFilter: ["data-attr-colored"],
  });

  trackedElements.set(element, elementObserver);
  activeObservers.set(element, elementObserver);
  stats.elementsTracked++;
}

function markAndProtectAttributeElements() {
  document.querySelectorAll(".sb-line-task .sb-atom").forEach((atom) => {
    const atomText = atom.textContent.trim();
    const config = ATTRIBUTES_CONFIG.find((c) => c.name === atomText);

    if (config) {
      const value = atom.nextElementSibling?.nextElementSibling;
      if (value && value.classList.contains("sb-frontmatter")) {
        const isChecked = value.closest(".cm-task-checked");

        if (!isChecked) {
          protectElement(value, config.name);
        } else {
          if (value.hasAttribute("data-attr-colored")) {
            value.removeAttribute("data-attr-colored");
          }
        }
      }
    }
  });
}

function initDateColorScript() {
  console.log("🚀 Initialisation du script Multi-Attributs Color");

  markAndProtectAttributeElements();

  const globalObserver = new MutationObserver((mutations) => {
    let hasNewNodes = false;
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        hasNewNodes = true;
      }
    });

    if (hasNewNodes) {
      markAndProtectAttributeElements();
    }
  });

  globalObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });

  document.addEventListener("focus", markAndProtectAttributeElements, true);

  console.log("✅ Script Multi-Attributs Color activé");
  console.log(
    `📋 Attributs surveillés: ${ATTRIBUTES_CONFIG.map((c) => `${c.name}/${c.color}`).join(", ")}`,
  );
}

let initialized = false;
const DEBUG_EVENTS = false;

if (DEBUG_EVENTS) {
  console.log(
    "🔍 Mode DEBUG : Recherche des hooks d'événements SilverBullet...",
  );

  let clientCheckCount = 0;
  const checkClient = setInterval(() => {
    clientCheckCount++;

    if (window.client && window.client.eventHook) {
      console.log(
        `✅ window.client.eventHook trouvé après ${clientCheckCount * 50}ms`,
      );
      clearInterval(checkClient);

      const eventHook = window.client.eventHook;
      console.log("📋 eventHook disponible:", Object.keys(eventHook));

      if (eventHook.addLocalListener || eventHook.listen || eventHook.on) {
        console.log("🎣 Tentative d'écoute de system:ready...");

        const listenerMethod =
          eventHook.addLocalListener || eventHook.listen || eventHook.on;
        try {
          listenerMethod.call(eventHook, "system:ready", () => {
            if (!initialized) {
              console.log("📢 Événement system:ready capturé via eventHook !");
              initialized = true;
              setTimeout(() => initDateColorScript(), 100);
            }
          });
          console.log("✅ Listener system:ready enregistré");
        } catch (e) {
          console.log("⚠️ Erreur lors de l'enregistrement du listener:", e);
        }
      } else {
        console.log("❌ Pas de méthode d'écoute trouvée dans eventHook");
        console.log("📋 Méthodes disponibles:", Object.keys(eventHook));
      }
    } else if (clientCheckCount % 20 === 0) {
      console.log(
        `⏳ window.client.eventHook indisponible après ${clientCheckCount * 50}ms...`,
      );
    }

    if (clientCheckCount >= 300) {
      console.log(
        "⚠️ window.client.eventHook jamais détecté après 15 secondes",
      );
      clearInterval(checkClient);
    }
  }, 50);
}

console.log("⏳ Attente du chargement complet de SilverBullet...");

let clientCheckCount = 0;
const checkClient = setInterval(() => {
  clientCheckCount++;

  if (window.client && window.client.eventHook) {
    if (!DEBUG_EVENTS)
      console.log(
        `✅ window.client.eventHook trouvé après ${clientCheckCount * 50}ms`,
      );
    clearInterval(checkClient);

    const eventHook = window.client.eventHook;
    const listenerMethod =
      eventHook.addLocalListener || eventHook.listen || eventHook.on;

    if (listenerMethod) {
      try {
        listenerMethod.call(eventHook, "system:ready", () => {
          if (!initialized) {
            console.log("📢 Événement system:ready capturé via eventHook !");
            initialized = true;
            setTimeout(() => initDateColorScript(), 100);
          }
        });
      } catch (e) {
        console.log("⚠️ Erreur:", e);
      }
    }
  }

  if (clientCheckCount >= 300) {
    clearInterval(checkClient);
    if (!initialized) {
      console.log("⚠️ Timeout : initialisation forcée");
      initialized = true;
      initDateColorScript();
    }
  }
}, 50);
