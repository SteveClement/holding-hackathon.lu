var c = document.getElementById("c");
var ctx = c.getContext("2d");

var emojiSupported = (function() {
  var node = document.createElement('canvas');
  if (!node.getContext || !node.getContext('2d') ||
    typeof node.getContext('2d').fillText !== 'function')
    return false;
  var ctx = node.getContext('2d');
  ctx.textBaseline = 'top';
  ctx.font = '32px Arial';
  ctx.fillText('\ud83d\ude03', 0, 0);
  return ctx.getImageData(16, 16, 1, 1).data[0] !== 0;
})();

function make_base()
{
  base_image = new Image();
  base_image.src = 'hackathon.png';
  base_image.onload = function(){
    ctx.drawImage(base_image, Math.floor(c.width/3), Math.floor(c.height/3));
console.log(Math.floor(height/3));
  }
}

//making the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;

var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;


// Show hackathon image
make_base();

var halfKana = "｡｢｣､･ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
var emoji = "❤️♠️♣️♦️♻️⚠️☀️♨️☁️☂️☎️";
var emojiColor = "☠️☘⚡⛔☢️☣️⏰⌨️⌚⭐⚛☕⚙";
//chinese characters - taken from the unicode charset
var cn = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
var ua = "АаБбВвГгҐґДдЕеЄєЖжЗзИиІіЇїЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЬьЮюЯя";

randChar = [];
randChar.push(halfKana);
randChar.push(emoji);
randChar.push(emojiColor);
randChar.push(cn);
randChar.push(ua);

r = Math.floor((Math.random() * randChar.length) );
chars = randChar[r];

//converting the string into an array of single characters
try {
    chars = chars.split("");
} catch(e) {
    console.log(e instanceof TypeError); // true
    console.log(e.message);              // "null has no properties"
    console.log(e.name);                 // "TypeError"
    console.log(e.fileName);             // "Scratchpad/1"
    console.log(e.lineNumber);           // 2
    console.log(e.columnNumber);         // 2
    console.log(e.stack);                // "@Scratchpad/2:2:3\n"
    console.log(r);
}

var font_size = 24;
var columns = c.width / font_size; //number of columns for the rain
//an array of drops - one per column
var drops = [];
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for (var x = 0; x < columns; x++)
  drops[x] = 1;

//drawing the characters
function draw() {
  //Black BG for the canvas
  //translucent BG to show trail
  background = "rgba(0, 0, 0, 0.05)";
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, c.width, c.height);

  ctx.fillStyle = "#0F0"; //green text
  ctx.font = font_size + "px arial";
  //looping over drops
  for (var i = 0; i < drops.length; i++) {
    //a random chinese character to print
    var text = chars[Math.floor(Math.random() * chars.length)];
    //x = i*font_size, y = value of drops[i]*font_size
    ctx.fillText(text, i * font_size, drops[i] * font_size);

    //sending the drop back to the top randomly after it has crossed the screen
    //adding a randomness to the reset to make the drops scattered on the Y axis
    if (drops[i] * font_size > c.height && Math.random() > 0.975)
      drops[i] = 0;

    //incrementing Y coordinate
    drops[i]++;
  }
}

setInterval(draw, 33);
