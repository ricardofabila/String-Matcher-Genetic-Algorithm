// Genetic Algorithm
// A class to describe a population of virtual organisms
// In this case, each organism is just an instance of a DNA object

class Population {
  constructor(target, mutationRate, total_generations) {
    this.population;                   // Array to hold the current population
    this.matingPool;                   // ArrayList which we will use for our "mating pool"
    this.generations = 0;              // Number of generations
    this.finished = false;             // Are we finished evolving?
    this.target = target;              // Target phrase
    this.mutationRate = mutationRate;  // Mutation rate
    this.perfectScore = 1;             // Whats the best fitness that can be achived

    this.best = ""; //initializing best to empty string

    //Filling the population with random DNA's of the size of the target and the desired total generation
    this.population = [];
    for (var i = 0; i < total_generations; i++) {
      this.population[i] = new DNA(this.target.length);
    }

    this.matingPool = []; //The mating pool at the begining is empty, since we having mated yet
    this.calcFitnessOfPopulation(); //Calculating the fitness of our random first population so we can pick for our new matingPool
  }

  // Fill our fitness array with a value for every member of the population
  calcFitnessOfPopulation() {
    for (var i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(this.target); //calcualting the fitness of each individual DNA
    }
  }

  // Generate a mating pool
  naturalSelection() {
    // Clear the ArrayList
    this.matingPool = [];

    var maxFitness = 0;
    for (var i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > maxFitness) {
        maxFitness = this.population[i].fitness;
      }
    }

    // Based on fitness, each member will get added to the mating pool a certain number of times
    // a higher fitness = more entries to mating pool = more likely to be picked as a parent
    // a lower fitness = fewer entries to mating pool = less likely to be picked as a parent
    for (var i = 0; i < this.population.length; i++) {

      //var fitness = map(this.population[i].fitness,0,maxFitness,0,1);
      var fitness = this.map(this.population[i].fitness, 0,maxFitness,0,1);
      var n = Math.floor(fitness * 100);  // Arbitrary multiplier, we can also use monte carlo method
      for (var j = 0; j < n; j++) {              // and pick two random numbers
        this.matingPool.push(this.population[i]);
      }
    }
  }

  // Create a new generation
  generate() {
    // Refill the population with children from the mating pool
    for (var i = 0; i < this.population.length; i++) {
      var a = Math.floor(this.random(this.matingPool.length));
      var b = Math.floor(this.random(this.matingPool.length));
      var partnerA = this.matingPool[a];
      var partnerB = this.matingPool[b];
      var child = partnerA.crossover(partnerB);
      child.mutate(this.mutationRate);
      this.population[i] = child;
    }
    this.generations++;
  }

  random(low, high){
     return (Math.random() * high)  + low;
  }

  random(number){
     return (Math.random() * number);
  }


  getBest() {
    return this.best;
  }

  // Compute the current "most fit" member of the population
  evaluate() {
    var worldrecord = 0.0;
    var index = 0;
    for (var i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > worldrecord) {
        index = i;
        worldrecord = this.population[i].fitness;
      }
    }

    this.best = this.population[index].getPhrase();
    if (worldrecord === this.perfectScore) {
      this.finished = true;
    }
  }

  isFinished() {
    return this.finished;
  }

  getGenerations() {
    return this.generations;
  }

  // Compute average fitness for the population
  getAverageFitness() {
    var total = 0;
    for (var i = 0; i < this.population.length; i++) {
      total += this.population[i].fitness;
    }
    return total / (this.population.length);
  }

  allPhrases() {
    var everything = "";

    var displayLimit = Math.min(this.population.length, 15);


    for (var i = 0; i < displayLimit; i++) {
      everything += this.population[i].getPhrase() + "<br>";
    }
    return everything;
  }

  map(number, in_min, in_max, out_min, out_max) {
    return (number - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

}
