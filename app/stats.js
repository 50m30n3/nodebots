function Stats( bots )
{
	function print()
	{
		var numBots = bots.length;

		var avgAge = bots.reduce( function( val, bot )
		{
			return val + bot.age / numBots;
		}, 0);

		var maxAge = bots.reduce( function( val, bot )
		{
			return bot.age>val?bot.age:val;
		}, 0);

		var avgGen = bots.reduce( function( val, bot )
		{
			return val + bot.generation / numBots;
		}, 0);

		var maxGen = bots.reduce( function( val, bot )
		{
			return bot.generation>val?bot.generation:val;
		}, 0);

		var avgRate = bots.reduce( function( val, bot )
		{
			return val + bot.mutationrate / numBots;
		}, 0);

		console.log
		(
			'N:' + numBots + ' ' +
			'Aa:' + avgAge.toFixed(2) + ' ' +
			'Am:' + maxAge.toFixed(0) + ' ' +
			'Ga:' + avgGen.toFixed(2) + ' ' +
			'Gm:' + maxGen.toFixed(0) + ' ' +
			'Ra:' + avgRate.toFixed(2)// + ' ' +
		);
	}

	this.print = print;
}

module.exports = Stats;

