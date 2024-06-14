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