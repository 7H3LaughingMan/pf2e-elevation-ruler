Hooks.once("ready", () => {
    if (!game.user.isGM) return;
    ui.notifications.info("PF2e Elevation Ruler is no longer being maintained and no longer works, please remove it.");
});