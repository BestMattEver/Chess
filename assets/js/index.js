//================ PIECE REFRENCE ==============
//
// ===== WHITE =====           ===== Black =====
// &#9814; = Rook               &#9820; = Rook
// &#9816; = Knight             &#9822; = Knight
// &#9815; = Bishop             &#9821; = Bishop
// &#9813; = Queen              &#9819; = Queen
// &#9812; = King               &#9818; = King
// &#9817; = Pawn               &#9823; = Pawn

//this is the initial board setup for a standard game of chess. im TRYING to use this as a constant. its... not working.
function initialBoard()
{
  var initialBoard =[
  ['&#9820;','&#9822;','&#9821;','&#9819;','&#9818;','&#9821;','&#9822;','&#9820;'],
  ['&#9823;','&#9823;','&#9823;','&#9823;','&#9823;','&#9823;','&#9823;','&#9823;'],
  [' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' '],
  ['&#9817;','&#9817;','&#9817;','&#9817;','&#9817;','&#9817;','&#9817;','&#9817;'],
  ['&#9814;','&#9816;','&#9815;','&#9813;','&#9812;','&#9815;','&#9816;','&#9814;'],
];
  return initialBoard;
}//because god hates us, I've had to turn this simple variable declaration into its own function so that nothing can touch the variable in local scope but i can still call it. hopefully it works. it seems to.

//this nested array represents the moves in the catalan opening: closed variation.
//found this info here:https://www.chess.com/opening/eco/E06_Catalan_Opening_Closed_Variation
//each array inside the array, represents a 'from' [x1,y1... and a 'to' ...x2,y2]
//ill feed that into my movepiece function and we'll see things on screen.

//I should also note that for some DUMB reason I wrote these in the format [y,x,y,x] and NOT [x,y,x,y] like you might logically think. why did i do this? because I wasnt paying attention. and because I hate us both. Some men just want to watch the world burn.

//actually i figured out why i did that. the <div> spaces are written that way in the HTMl.
var CatalanSeq = [
   [6,3,4,3],
   [0,6,2,5],
   [6,2,4,2],
   [1,4,2,4],
   [6,6,5,6],
   [1,3,3,3],
   [7,5,6,6],
   [0,5,1,4]
 ];
 var ruyLopezSeq = [
   [6,4,4,4],
   [1,4,3,4],
   [7,6,5,5],
   [0,1,2,2],
   [7,5,3,1],
   [0,5,4,1]
 ];
var YRSystemSeq = [
  [6,3,4,3],
  [0,6,2,5],
  [7,6,5,5],
  [1,4,2,4],
  [6,4,5,4]
];
//notably, doing it this way allows me to make a lot of different sequence arrays and feed them in arbitrarily to see lots of different openers played out.

var gameBoard;
gameBoard = initialBoard();//sets gameboard to be equal to initialboard. or DOES it...?
console.log(gameBoard.join('\n')+'\n\n');

//$("body").html(initialBoard.join('\n')+'\n\n');


//this constructor might seem like overkill, especially since im not getting around to using it. but hear me out: it would have been AWESOME. here's how it would have worked:
//instead of having just the piece html codes in the initialBoard array, I would have had new piece OBJECTS. when a player clicked on a square, we'd ask the piece object in that square what type it was. then using that information, its color, and an array of moves for that piece type to generate a NEW array of possible moves THIS TURN using weird rules like the pawn attack and making sure a piece cant take a piece of its color. THEN we'd color all the squares that piece could move to differently, and when a player clicked on one of THOSE squares we'd use the movePiece function to move the piece to that square. if they clicked a non-specially colored square, we'd do the whole thing over again for a new piece, or de-color all the squares (if he clicked on an empty space).
function ChessPiece(type, color)//this is my piece constructor
{
  this.color = color;//either BLACK or WHITE and nothing else.

  switch (type)
  {
    case "PAWN":
      this.type ="PAWN";
      this.moveSet = pawnMoves; //pawnmoves is an array of moves for a pawn.
      break;
    case "ROOK":
      this.type = "ROOk";
      this.moveSet = rookMoves;
      break;
    case "KNIGHT":
      this.type = "KNIGHT";
      this.moveSet = knightMoves;
      break;
    case "BISHOP":
      this.type ="BISHOP";
      this.moveSet = bishopMoves;
      break;
    case "KING":
      this.type ="KING";
      this.moveSet = kingMoves;
      break;
    case "QUEEN":
      this.type = "QUEEN"
      this.moveSet = queenMoves;
    }//end switch
}//end piece constructor

function movePiece(x1, y1, x2, y2) //this function takes 4 ints and moves whatever piece is at the first x/y to the second x/y
{
  if(gameBoard[x1][y1] === ' ')//if the initial space isnt empty.
  {

  }
  else
  {
    //move the piece
    gameBoard[x2][y2] = gameBoard[x1][y1];//automaitically removed whatever is in x2,y2. might need to keep track of what is removed...
    gameBoard[x1][y1] = ' ';//make the piece's initial location empty.
    console.log(gameBoard.join('\n')+'\n\n');
  }
}//end movePiece

function drawBoard()//this redraws all the pieces on the board from the board array
{
  for(var i =0; i < gameBoard.length; i++)
  {
    // console.log("row " + i);
    for(var p =0; p < gameBoard[i].length; p++)
    {
      // console.log("space " + p);
      $("#sq-" + i + "-" + p).html(gameBoard[i][p]);//draws the piece at (i,p) in the gameboard array to the (i,p) space in the html.
    }//end space for
  }//end row for
}//end drawboard()

var play = true;
var myInterval;
$("#play").click(function()
{
  if(play)//if play is true, play through the active sequence
  {
    $("#play").text("pause ||");
    if(seqCounter >= seqActive.length)//if you're at the end of the sequence, stop.
    {
      clearInterval(myInterval);
      console.log("you're at the end, brah.");
    }
    else//otherwise, call the forward function every 'interval' seconds.
    {
      myInterval = setInterval(forward, ($("#interval").val()*1000));
      play = false;
    }
  }
  else//if play is false and we've clicked
  {
      $("#play").text("Auto-Play >>")
      clearInterval(myInterval); // stop playing through.
      play = true;
  }
});//end play click.

var seqActive = CatalanSeq; //seqActive is so we can change out the sequences without overwriting the data in the sequence arrays.
$("#change").click(function(){
  switch($("#openers").val())
  {
    case "catalan":
      seqActive = CatalanSeq;
      $("header").text($("#openers :selected").text());
      break;
    case "RuyLopez":
      seqActive = ruyLopezSeq;
      $("header").text($("#openers :selected").text());
      break;
    case "YRSystem":
      seqActive = YRSystemSeq;
      $("header").text($("#openers :selected").text());
      break;
  }
  seqCounter = 0;
  gameBoard = initialBoard();
  drawBoard();
  console.log(seqActive.join('\n')+'\n\n');
});//end change click function

var seqCounter = 0;
console.log(seqActive.join('\n')+'\n\n');

$("#forward").click(forward);//when we click the forward button, call the forward function

function forward()//this function advances the active sequence 1 step.
{
  console.log('inside the forward click!');

  if(seqCounter < seqActive.length)//this checks to make sure we're not off the end of the sequence array.
  {
    console.log("movin a piece!");
    console.log(seqActive[seqCounter]);
    movePiece(seqActive[seqCounter][0],seqActive[seqCounter][1],seqActive[seqCounter][2],seqActive[seqCounter][3]);//this feeds the 4 numbers in each row of the sequence to the movepiece funtion.
    seqCounter++;

    drawBoard();//redraw the board with the new piece locations.
  }
  else {console.log("you're at the end of the sequence bub.");}
};//end forward

$("#back").click(function(){//when we click the back button, run the previous step in the selected sequence
  console.log('inside the back click!');
  if(seqCounter > 0)//this checks to make sure we're not off the end of the sequence array.
  {
    seqCounter--;
    console.log("movin a piece back!");
    movePiece(seqActive[seqCounter][2],seqActive[seqCounter][3],seqActive[seqCounter][0],seqActive[seqCounter][1]);//this feeds the 4 numbers in each row of the sequence to the movepiece funtion.
    //IMPORTANT! since this is the back button, we feed the 2 sets of xy coordinates into this function BACKWARDS from how they are written in the sequence. instead of moving TO a location, we'll be moving back FROM a location

    drawBoard();//redraw the board with the new piece locations.
  }
  else{console.log("you're at the start of the sequence pal.");}
});//end back click

  $("#start").on("click", function()
  {
    console.log("inside the start");
    //console.log(seqActive[seqCounter][0]);
    if(seqCounter >= seqActive.length)
    {
      seqCounter--;//ive been getting out of bounds errors... hopefully this fixes?
    }

    for(var j = seqCounter; j >=0; j--)//basically do the same thing as the back button, but do it as many times as you've already gone forward.
    {
      console.log(seqCounter);
      movePiece(seqActive[seqCounter][2],seqActive[seqCounter][3],seqActive[seqCounter][0],seqActive[seqCounter][1]);//this feeds the 4 numbers in each row of the sequence to the movepiece funtion.
      //IMPORTANT! since this is the back button, we feed the 2 sets of xy coordinates into this function BACKWARDS from how they are written in the sequence. instead of moving TO a location, we'll be moving back FROM a location
      seqCounter--;
    }

    //gameBoard = initialBoard;
    //for some reason, this does nothing because initialBoard has been changed along with gameBoard. this should not be. its a bug. keeping this in so i can show someone.

    seqCounter = 0;//just makes sure we can go forward from here.
    drawBoard();
  })//end start click

  $("#end").click(function()
  {
    for(var y = seqCounter; y < seqActive.length; y++)//basically, do the forward function as many times as we need to get to the end of seqActive.
    {
      movePiece(seqActive[seqCounter][0],seqActive[seqCounter][1],seqActive[seqCounter][2],seqActive[seqCounter][3]);//this feeds the 4 numbers in each row of the sequence to the movepiece funtion.
      seqCounter++;
    }
    seqCounter = seqActive.length;
    drawBoard();//redraw the board with the new piece locations.
  })//end back click

//movePiece(0,4,4,4);
//movePiece(0,7,4,7);
drawBoard();
