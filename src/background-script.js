browser.browserAction.onClicked.addListener(async (activeTab, event) => {
    const allWindowTabs = await browser.tabs.query({ currentWindow: true });

    if (allWindowTabs.length <= 0) {
        return;
    }

    const rightMostTab = allWindowTabs[allWindowTabs.length - 1];

    if (activeTab.id === rightMostTab.id) {
        return;
    }

    console.log("[scroll-right-button] active=", activeTab, "last=", rightMostTab);

    await browser.tabs.update(rightMostTab.id, { active: true });

    // left=0, right=1
    if (event.button === 1) {
        await browser.tabs.update(activeTab.id, { active: true });
    }
});
