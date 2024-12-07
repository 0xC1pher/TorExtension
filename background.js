chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

function enableTorProxy() {
  chrome.proxy.settings.set(
    { value: { mode: "fixed_servers", rules: { singleProxy: { host: "127.0.0.1", port: 9150 } } }, scope: "regular" },
    () => {
      console.log("Tor proxy enabled");
      chrome.declarativeNetRequest.updateEnabledRulesets({ enableRulesetIds: ["tor_rules"] }, () => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
        }
      });
    }
  );
}

function disableTorProxy() {
  chrome.proxy.settings.clear({ scope: "regular" }, () => {
    console.log("Tor proxy disabled");
    chrome.declarativeNetRequest.updateEnabledRulesets({ disableRulesetIds: ["tor_rules"] }, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
      }
    });
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "enableTor") {
    enableTorProxy();
  } else if (request.action === "disableTor") {
    disableTorProxy();
  }
});

