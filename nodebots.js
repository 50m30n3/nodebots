var conf = require( './conf/conf' );

var bots;
var food;

var Sim = require( './app/sim.js' );

var sim = new Sim( bots, food );

setInterval( sim.loop, conf.loopInterval );
setInterval( sim.reset, conf.resetInterval );

