Hooks.once("ready", () => {
    new window.Ardittristan.ColorSetting("pf2e-elevation-ruler", "singleAction", {
        name: "Single Action Color",
        label: "Color Picker",
        restricted: false,
        defaultColor: "#3222C7",
        scope: "client",
        onChange: (value) => { CONFIG.elevationruler.SPEED.CATEGORIES[0].color = Color.from(value.substring(0, 7)); }
    })

    new window.Ardittristan.ColorSetting("pf2e-elevation-ruler", "doubleAction", {
        name: "Double Action Color",
        label: "Color Picker",
        restricted: false,
        defaultColor: "#FFEC07",
        scope: "client",
        onChange: (value) => { CONFIG.elevationruler.SPEED.CATEGORIES[1].color = Color.from(value.substring(0, 7)); }
    })

    new window.Ardittristan.ColorSetting("pf2e-elevation-ruler", "tripleAction", {
        name: "Triple Action Color",
        label: "Color Picker",
        restricted: false,
        defaultColor: "#C033E0",
        scope: "client",
        onChange: (value) => { CONFIG.elevationruler.SPEED.CATEGORIES[2].color = Color.from(value.substring(0, 7)); }
    })

    new window.Ardittristan.ColorSetting("pf2e-elevation-ruler", "quadrupleAction", {
        name: "Quadruple Action Color",
        label: "Color Picker",
        restricted: false,
        defaultColor: "#1BCAD8",
        scope: "client",
        onChange: (value) => { CONFIG.elevationruler.SPEED.CATEGORIES[3].color = Color.from(value.substring(0, 7)); }
    })

    new window.Ardittristan.ColorSetting("pf2e-elevation-ruler", "unreachable", {
        name: "Unreachable",
        label: "Color Picker",
        restricted: false,
        defaultColor: "#FF0000",
        scope: "client",
        onChange: (value) => { CONFIG.elevationruler.SPEED.CATEGORIES[4].color = Color.from(value.substring(0, 7)); }
    })

    let SingleAction = {
        name: "Single Action",
        color: Color.from(game.settings.get("pf2e-elevation-ruler", "singleAction").substring(0, 7)),
        multiplier: 1
    }

    let DoubleAction = {
        name: "Double Action",
        color: Color.from(game.settings.get("pf2e-elevation-ruler", "doubleAction").substring(0, 7)),
        multiplier: 2
    }

    let TripleAction = {
        name: "Triple Action",
        color: Color.from(game.settings.get("pf2e-elevation-ruler", "tripleAction").substring(0, 7)),
        multiplier: 3
    }

    let QuadrupleAction = {
        name: "Quadruple Action",
        color: Color.from(game.settings.get("pf2e-elevation-ruler", "quadrupleAction").substring(0, 7)),
        multiplier: 4
    }

    let Unreachable = {
        name: "Unreachable",
        color: Color.from(game.settings.get("pf2e-elevation-ruler", "unreachable").substring(0, 7)),
        multiplier: Number.POSITIVE_INFINITY
    }

    CONFIG.elevationruler.SPEED.CATEGORIES = [SingleAction, DoubleAction, TripleAction, QuadrupleAction, Unreachable];

    CONFIG.elevationruler.SPEED.tokenSpeed = function (token) {
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

        if (speed === null) return null;
        return Number(speed);
    };
});