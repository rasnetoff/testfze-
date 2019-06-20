copied from https://github.com/Nepherius/Nephbot/tree/master/system

so start.js runs main.js upon require statement
and eventually start.js runs startBot from system/connect.js

startBot runs new net.Socket socket connection "s"
s has "readable" event and calls parseChunk

(parseChunk calls chatpacket.js .parse_packet function)

in main.js
