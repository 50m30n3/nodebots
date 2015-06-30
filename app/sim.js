var debug = require( 'debug' )( 'nodebots:sim' );
var http = require( 'http' );

var conf = require( '../conf/conf' );

var neurobot = require( './neurobot' );
var plant = require( './plant' );

function Sim( bots, food )
{
	var fooddelay;
	var foodrate;

	function addbot()
	{
		var bot = new neurobot( Math.random()*conf.width, Math.random()*conf.height, Math.PI*2*Math.random() );

		debug( 'Birth' );

		if( Math.random() < conf.downloadPercentage )
		{
			debug( 'Genome GET' );

			var options =
			{
				host: conf.host,
				path: conf.path,
			};

			var callback = function( response )
			{
				var str = '';

				response.on( 'data', function(chunk)
				{
					str += chunk;
				});

				response.on( 'end', function ()
				{
					bot.loaddata( str );
				});
			}

			http.request( options, callback ).end();
		}

		bots.push( bot );
	}

	function loop()
	{
		for( var i=0; i<bots.length; i++ )
		{
			if( bots[i].alife == false )
			{
				debug( 'Death (' + bots[i].age + ')' );

				if( ( bots[i].age >= 10000 ) && ( Math.random() < conf.uploadPercentage ) )
				{
					debug( 'Genome POST' );

					var options =
					{
						host: conf.host,
						path: conf.path,
						method: 'POST'
					};

					var postdata = 'data=' + encodeURIComponent( bots[i].getdata() );

					var req = http.request( options );
					req.setHeader( 'Content-type', 'application/x-www-form-urlencoded' )
					req.setHeader( 'Content-length', postdata.length )
					req.write( postdata );
					req.end();
				}

				bots.splice( i, 1 );
				i--;
			}
			else
			{
				bots[i].step( bots, food );
			}
		}

		for( var i=0; i<food.length; i++ )
		{
			if( food[i].alife == false )
			{
				food.splice( i, 1 );
				i--;
			}
			else
			{
				food[i].step();
			}
		}

		if( bots.length <= (conf.width*conf.height)/50000 )
		{
			addbot();
		}

		if( ( fooddelay <= 0 ) && ( food.length < (conf.width*conf.height)/20000 ) )
		{
			fooddelay = 8;
			food.push( new plant( Math.random()*conf.width, Math.random()*conf.height ) );
		}

		if( fooddelay > 0 )
			fooddelay--;
	}

	function reset_bots()
	{
		bots.length = 0;

		for( var j=0; j<(conf.width*conf.height)/50000; j++ )
		{
			addbot();
		}
	}

	function reset_food()
	{
		food.length = 0;
		fooddelay = 0;

		for( var i=0; i<(conf.width*conf.height)/20000; i++ )
			food.push( new plant( Math.random()*conf.width, Math.random()*conf.height, 150 ) );
	}

	function reset()
	{
		debug( 'Reset' );
		reset_bots();
		reset_food();
	}

	reset();

	this.loop = loop;
	this.reset = reset;
}

module.exports = Sim;

