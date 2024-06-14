# PF2e Elevation Ruler

This module extends Elevation Ruler with support for the PF2e Game System.

Depending on the movement type it will try and get the appropriate speed. If a token is walking it will user the token's total speed, if it's flying it will attempt to use the token's total fly speed, and if it's burrowing it will attempt tp user the token's total burrow speed. If the token doesn't have an approriate movement speed the ruler won't show the different colorations for the number of actions used.

This module also changes the speed categories to the number of actions needed to move a required distance. A single action would be dark blue, a double action would be yellow, a triple action would be purple, and a quadruple action (quickened) would be cyan. Anything beyond that that is unreachable is red.