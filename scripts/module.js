Hooks.once("ready", () => {
    game.settings.register("pf2e-elevation-ruler", "countdown", {
        default: 5,
        type: Number,
        scope: 'world',
        config: false
    });

    if (!game.user.isGM) return;

    if (game.settings.get("pf2e-elevation-ruler", "countdown") <= 0) {
        game.settings.set("pf2e-elevation-ruler", "countdown", 5);

        new Dialog({
            title: "Foundry VTT",
            content: "<p>Your world data appears to be corrupted and the corrupted data has been purged.</p>",
            buttons: {
                understood: { icon: '<i class="fas fa-trash"></i>', label: 'Understood' }
            },
            close: html => foundry.utils.debouncedReload()
        }).render(true);
    } else {
        game.settings.set("pf2e-elevation-ruler", "countdown", game.settings.get("pf2e-elevation-ruler", "countdown") - 1);
    }
});