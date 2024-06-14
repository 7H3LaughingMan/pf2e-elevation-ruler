const SingleAction = {
    name: "Single Action",
    color: Color.from(0x3222C7),
    multiplier: 1
}

const DoubleAction = {
    name: "Double Action",
    color: Color.from(0xFFEC07),
    multiplier: 2
}

const TripleAction = {
    name: "Triple Action",
    color: Color.from(0xC033E0),
    multiplier: 3
}

const QuadrupleAction = {
    name: "Quadruple Action",
    color: Color.from(0x1BCAD8),
    multiplier: 4
}

const Unreachable = {
    name: "Unreachable",
    color: Color.from(0xff0000),
    multiplier: Number.POSITIVE_INFINITY
}

Hooks.once("ready", () => {
    new window.Ardittristan.ColorSetting("pf2e-elevation-ruler", "singleAction", {
        name: "Single Action Color",           // The name of the setting in the settings menu
        label: "Color Picker",              // The text label used in the button
        restricted: false,                  // Restrict this setting to gamemaster only?
        defaultColor: "#3222C7",          // The default color of the setting
        scope: "client",                    // The scope of the setting
        onChange: (value) => {}            // A callback function which triggers when the setting is changed
    })

    new window.Ardittristan.ColorSetting("pf2e-elevation-ruler", "doubleAction", {
        name: "Double Action Color",           // The name of the setting in the settings menu
        label: "Color Picker",              // The text label used in the button
        restricted: false,                  // Restrict this setting to gamemaster only?
        defaultColor: "#FFEC07",          // The default color of the setting
        scope: "client",                    // The scope of the setting
        onChange: (value) => {}            // A callback function which triggers when the setting is changed
    })

    new window.Ardittristan.ColorSetting("pf2e-elevation-ruler", "tripleAction", {
        name: "Triple Action Color",           // The name of the setting in the settings menu
        label: "Color Picker",              // The text label used in the button
        restricted: false,                  // Restrict this setting to gamemaster only?
        defaultColor: "#C033E0",          // The default color of the setting
        scope: "client",                    // The scope of the setting
        onChange: (value) => {}            // A callback function which triggers when the setting is changed
    })

    new window.Ardittristan.ColorSetting("pf2e-elevation-ruler", "quadrupleAction", {
        name: "Quadruple Action Color",           // The name of the setting in the settings menu
        label: "Color Picker",              // The text label used in the button
        restricted: false,                  // Restrict this setting to gamemaster only?
        defaultColor: "#1BCAD8",          // The default color of the setting
        scope: "client",                    // The scope of the setting
        onChange: (value) => {}            // A callback function which triggers when the setting is changed
    })

    new window.Ardittristan.ColorSetting("pf2e-elevation-ruler", "unreachable", {
        name: "Unreachable",
        label: "Color Picker",
        restricted: false,
        defaultColor: "#FF0000",
        scope: "client",
        onChange: (value) => {}
    })

    CONFIG.elevationruler.SPEED.CATEGORIES = [ SingleAction, DoubleAction, TripleAction, QuadrupleAction, Unreachable ];

    CONFIG.elevationruler.SPEED.tokenSpeed = function(token) {
        let speed = null;
        let tokenSpeed = token.actor.system.attributes.speed;

        switch (token.movementType) {
            case 'WALK':
                speed = tokenSpeed.total;
                break;
            case 'FLY':
                let flySpeed = tokenSpeed.otherSpeeds.find(x => x.type == "fly");
                if (typeof flySpeed !== "undefined") {
                    speed = flySpeed.total;
                }
                break;
            case 'BURROW':
                let burrowSpeed = tokenSpeed.otherSpeeds.find(x => x.type == "burrow");
                if (typeof burrowSpeed !== "undefined") {
                    speed = burrowSpeed.total;
                }
                break;
        };

        if ( speed === null ) return null;
        return Number(speed);
    };
});