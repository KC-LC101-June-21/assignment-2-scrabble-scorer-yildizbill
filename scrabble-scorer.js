const input = require('readline-sync');

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

let vowels = ['A','E','I','O','U'];

function oldScrabbleScore(wrd){
  let letterPoints = '';
  for(let i=0; i<wrd.length; i++){
    for(const pointValue in oldPointStructure){
      if(oldPointStructure[pointValue].includes(wrd[i])){
        letterPoints += `Points for '${wrd[i]}': ${pointValue}\n`;
      }
    }
  }
  return letterPoints;
};


//Asking user input
function initialPrompt(){

  let answer = input.question('Please enter a valid word: ');
  answer = answer.toLowerCase();
  return answer;

};

// word length giving us the total point
function simpleScore(wrd){
  wrd = wrd.toUpperCase();
  let count=0;
  for (const items in oldPointStructure) {
    for(let i=0; i<wrd.length; i++){
       if (oldPointStructure[items].includes(wrd[i])){
          count++;
        }
      }
    }
  return count;
};

//vowels get 3 point consonants get 1 point each
function vowelBonusScore(wrds){
  wrds = wrds.toUpperCase();
  let count = 0;
  for(let i=0; i<wrds.length; i++){
    if(vowels.includes(wrds[i])){
      count+=3;
    }else{
      count++;
    }
  }
  return count;

};


//uses old point structure
function scrabbleScore(wrd){
   wrd = wrd.toLowerCase();
  // for(let i=0; i<wrd.length; i++){
  //   for(numbers in oldPointStructure){
  //     if(oldPointStructure[numbers].includes(wrd[i])){
  //       newPoint+=Number(numbers);
  //     }
  //   }
  // }
  // return newPoint;
  let newPoint=0;
  for(let item of wrd){
    newPoint+= Number(newPointStructure[item]);
    //console.log(newPoint);
  }
  return newPoint;
};

//whole scoring algorithms stored into an object
const scoringAlgorithms = [

  {
  name: 'Simple Score',
  description: 'Each letter is worth 1 point.',
  scoringFunction: simpleScore
  },

  {
  name: 'Bonus vowels',
  description: 'Vowels are 3 pts, consonants are 1 pt.',
  scoringFunction: vowelBonusScore
  },

  {
  name: 'Scrabble',
  description: 'The traditional scoring algorithm.',
  scoringFunction: scrabbleScore
  },
 
];

// we are letting user to choose one of the scoring algorithms
function scorerPrompt(){

  console.log(`scoringAlgorithms:\n 0) ${scoringAlgorithms[0].name}: Each letter worths 1 point. \n 1)${scoringAlgorithms[1].name}: Vowels worth 3 point each \n 2)${scoringAlgorithms[2].name}: Uses scrabble point system`);

  let usrInput = input.question('Please select one of the calculator: ');
  //usrInput = usrInput.toUpperCase();
  let innerInput = initialPrompt();

  if(usrInput == 0){
    console.log('Algorithm name: '+scoringAlgorithms[0].name);
    console.log('Scoring Algorithm result: '+scoringAlgorithms[0].scoringFunction(innerInput));
  }else if(usrInput == 1){
    console.log('Algorithm name: '+scoringAlgorithms[1].name);
    console.log('Scoring Algorithm result: '+scoringAlgorithms[1].scoringFunction(innerInput));
  }else if(usrInput == 2){
    console.log('Algorithm name: '+scoringAlgorithms[2].name);
    console.log('Scoring Algorithm result: '+scoringAlgorithms[2].scoringFunction(innerInput));
  }else{
    console.log('Please use number between 0 to 2');
  }

};

function transform(arr){

  let newObject = {};
  for(let x of Object.entries(arr)){
    for(let i of x[1]){
      newObject[i.toLowerCase()] = parseInt(x[0])
      
    }
  }
  //console.log(newObject);
  return newObject;
};


let newPointStructure = transform(oldPointStructure);
//console.log(newPointStructure);

function runProgram(){
  //let ourInput = initialPrompt();
  //oldScrabbleScore(ourInput);
  scorerPrompt();
};

module.exports = {

  initialPrompt : initialPrompt,
  transform : transform,
  oldPointStructure : oldPointStructure,
  simpleScore : simpleScore,
  vowelBonusScore : vowelBonusScore,
  scrabbleScore : scrabbleScore,
  scoringAlgorithms : scoringAlgorithms,
  newPointStructure : newPointStructure,
  runProgram : runProgram,
  scorerPrompt : scorerPrompt

};







