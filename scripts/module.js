import { getActionCount } from "./action.js"

Hooks.once("init", () => {
    game.settings.register("pf2e-elevation-ruler", "singleAction", {
        name: "Single Action Color",
        scope: "client",
        config: true,
        type: new foundry.data.fields.ColorField(),
        default: "#3222C7",
        onChange: (value) => { refreshSpeedCategories(); }
    });

    game.settings.register("pf2e-elevation-ruler", "doubleAction", {
        name: "Double Action Color",
        scope: "client",
        config: true,
        type: new foundry.data.fields.ColorField(),
        default: "#FFEC07",
        onChange: (value) => { refreshSpeedCategories(); }
    });

    game.settings.register("pf2e-elevation-ruler", "tripleAction", {
        name: "Triple Action Color",
        scope: "client",
        config: true,
        type: new foundry.data.fields.ColorField(),
        default: "#C033E0",
        onChange: (value) => { refreshSpeedCategories(); }
    });

    game.settings.register("pf2e-elevation-ruler", "quadrupleAction", {
        name: "Quadruple Action Color",
        scope: "client",
        config: true,
        type: new foundry.data.fields.ColorField(),
        default: "#1BCAD8",
        onChange: (value) => { refreshSpeedCategories(); }
    });

    game.settings.register("pf2e-elevation-ruler", "unreachable", {
        name: "Unreachable",
        scope: "client",
        config: true,
        type: new foundry.data.fields.ColorField(),
        default: "#FF0000",
        onChange: (value) => { refreshSpeedCategories(); }
    });

    game.settings.register("pf2e-elevation-ruler", "limitActions", {
        name: "Limit Actions",
        hint: "This will limit the number of actions available to a token for movement if they are slowed/stunned.",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });
});

Hooks.once("ready", () => {
    refreshSpeedCategories();

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

    CONFIG.elevationruler.SPEED.maximumCategoryDistance = function (token, speedCategory, tokenSpeed) {
        let actionCount = getActionCount(token);

        switch (speedCategory.name) {
            case "Single Action":
                return ((actionCount >= 1) ? speedCategory.multiplier * tokenSpeed : 0);
            case "Double Action":
                return ((actionCount >= 2) ? speedCategory.multiplier * tokenSpeed : 0);
            case "Triple Action":
                return ((actionCount >= 3) ? speedCategory.multiplier * tokenSpeed : 0);
            case "Quadruple Action":
                return ((actionCount >= 4) ? speedCategory.multiplier * tokenSpeed : 0);
        }

        return Number.POSITIVE_INFINITY;
    };
});

function refreshSpeedCategories() {
    let SingleAction = {
        name: "Single Action",
        color: Color.from(game.settings.get("pf2e-elevation-ruler", "singleAction")),
        multiplier: 1
    }

    let DoubleAction = {
        name: "Double Action",
        color: Color.from(game.settings.get("pf2e-elevation-ruler", "doubleAction")),
        multiplier: 2
    }

    let TripleAction = {
        name: "Triple Action",
        color: Color.from(game.settings.get("pf2e-elevation-ruler", "tripleAction")),
        multiplier: 3
    }

    let QuadrupleAction = {
        name: "Quadruple Action",
        color: Color.from(game.settings.get("pf2e-elevation-ruler", "quadrupleAction")),
        multiplier: 4
    }

    let Unreachable = {
        name: "Unreachable",
        color: Color.from(game.settings.get("pf2e-elevation-ruler", "unreachable")),
        multiplier: Number.POSITIVE_INFINITY
    }

    CONFIG.elevationruler.SPEED.CATEGORIES = [SingleAction, DoubleAction, TripleAction, QuadrupleAction, Unreachable];
}