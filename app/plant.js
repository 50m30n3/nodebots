function plant( x, y, size )
{
	this.alife = true;
	this.x = x;
	this.y = y;
	
	if( ! size )
		this.size = 50;
	else
		this.size = size;

	this.step = function()
	{
		if( this.size < 150 )
			this.size += 0.25;
	}
}

module.exports = plant;

