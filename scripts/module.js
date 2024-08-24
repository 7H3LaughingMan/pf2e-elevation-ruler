Hooks.once("ready", ready);

async function ready() {
    if (!game.user.isGM) return;

    const currentModList = game.settings.get("core", ModuleManagement.CONFIG_SETTING);

    currentModList['pf2e-elevation-ruler'] = false;

    await game.settings.set("core", ModuleManagement.CONFIG_SETTING, currentModList);
    game.socket.emit("reload");
    foundry.utils.debouncedReload();
}