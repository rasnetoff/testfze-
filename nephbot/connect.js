// from https://github.com/Nepherius/Nephbot/blob/master/system/

const net = require('net')
const auth = require('./auth')
const pack = require('./pack')

var DEBUG = 0;

process.on('uncaughtException', function (err) {
	console.log("uncaughtException %s", err)
	console.log(err.stack);

})

//Connect to server & auth

const s = new net.Socket()
exports.s = s

exports.startBot = function(HOST, PORT) {
  console.log('Attempting Connection to server...')

  s.connect(PORT, HOST, function ()	{
		console.log('Connection Established!')
	})
}


exports.handle = {}

let remains = new Buffer.alloc(0)

s.on('readable', function ()
{
  console.log('socket is readable event');
  let buf = s.read();
	remains = Buffer.concat([remains, buf])
	while (parseChunk(remains));
})

function parseChunk(buf)
{
	let p = auth.parse_packet(buf)

	remains = p.remains
	if (!p.data)
	{
		console.log('Partial packet');
		return false
	}
	  console.log("Packet type %d", p.type)
	  console.log(p.data.toString('hex'))

	if (p.type in exports.handle)
	{
    console.log('type key exists in handle')
		exports.handle[p.type](p.data, new pack.Unpacker(p.data))
	}
	else
	{
		console.log("Unknown packet type %d", p.type)
	  console.log(p.data.toString('hex'))
	}
	return true
}

s.on('end', function ()
{
	console.log('end')
	die()
})
