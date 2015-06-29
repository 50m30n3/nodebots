var conf = require( './conf/conf' );

var Stats = require( './app/stats' )
var Sim = require( './app/sim.js' );

var bots = [];
var food = [];

var sim = new Sim( bots, food );
var stats = new Stats( bots );

setInterval( sim.loop, conf.loopInterval );
setInterval( sim.reset, conf.resetInterval );
setInterval( stats.print, conf.statsInterval );

