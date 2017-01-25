// Genetic Algorithm

// A class to describe a pseudo-DNA, i.e. genotype
//   Here, a virtual organism's DNA is an array of character.
//   Functionality:
//      -- convert DNA into a string
//      -- calculate DNA's "fitness"
//      -- mate DNA with another set of DNA
//      -- mutate DNA

class DNA {

  // Constructor (makes a random DNA)
  constructor(length) {
    // The genetic sequence is a string of characters
    this.genes = []; //the genes are a seccuence of chars
    this.fitness = 0; //the fitness of the DNA is set initially to zero
    this.target = '';

    //each new DNA is a string of the desired length of random characters
    for (var i = 0; i < length; i++) {
      this.genes[i] = this.newChar();  // Pick from range of chars
    }
  }

  // Converts character array to a String
  getPhrase() {
    return this.genes.join("");
  }

  // Fitness function (sets and returns floating point % of "correct" characters compared to the target) of the DNA
  calcFitness(target) {
    this.target = target;
     var score = 0;
     for (var i = 0; i < this.genes.length; i++) {
        if (this.genes[i] == target.charAt(i)) {
          score++;
        }
     }
     this.fitness = score / target.length; // result from 0 to one
     return this.fitness;
  }

  // Crossover function, creates a new DNA object from another DNA object called a partner
  crossover(partner) {
    //create the child of the length of the parent
    var child = new DNA(this.genes.length);

  // Pick a midpoint (not really in the middle as is radom every time)
    var midpoint = Math.floor(Math.random() + this.genes.length );

    // Half from one, half from the other (in terms of the midpoint)
    for (var i = 0; i < this.genes.length; i++) {
      if (i > midpoint) {
        child.genes[i] = this.genes[i];
      } else {
         child.genes[i] = partner.genes[i];
      }
    }

    return child;
  }

  // Based on a mutation probability, picks a new random character and inserts it into itself
  mutate(mutationRate) {
    //it can be insereted anywhere on the string
    for (var i = 0; i < this.genes.length; i++) {
      if (Math.random() < mutationRate) {
        this.genes[i] = this.newChar();
      }
    }
  }

  //This method returns a new char from the ASCII table at random (two characters are omitted)
  newChar() {
    var c = Math.floor( ( Math.random() * 122 ) + 63 );
    if (c === 63) c = 32;
    if (c === 64) c = 46;
    return String.fromCharCode(c);
  }

}
