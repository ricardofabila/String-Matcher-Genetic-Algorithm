let population;

$("#go").click( function(){

    document.getElementById('bestPhrase').innerHTML = "";
    document.getElementById('total').innerHTML      = "";
    document.getElementById('average').innerHTML    = "";
    document.getElementById('mutation').innerHTML   = "";

    let target = $('#phrase').val();
    let mutationRate = $('#rate').val();
    let popmax = $('#max').val();

    if ( target !== '' && mutationRate !== '' && popmax !== '' ) {
      console.log(target);
      console.log(mutationRate);
      console.log(popmax);

      // Create a population with a target phrase, mutation rate, and population max
      //the constructor fills the random population first and calculates its fitness
      population = new Population(target, mutationRate, popmax);

      let startHTML = document.getElementById('allPhrases').innerHTML;

      while (population.isFinished() === false) {
        // Generate mating pool
        population.naturalSelection(); //ramdom pool of the specified size
        //Create next generation
        population.generate(); //
        // Calculate fitness
        population.calcFitnessOfPopulation();

        population.evaluate();
      }

      document.getElementById('bestPhrase').innerHTML = "";
      document.getElementById('total').innerHTML      = "";
      document.getElementById('average').innerHTML    = "";
      document.getElementById('mutation').innerHTML   = "";

      document.getElementById('bestPhrase').innerHTML  += population.getBest();
      document.getElementById('total').innerHTML       += population.getGenerations() + "";
      document.getElementById('average').innerHTML     += Math.round( population.getAverageFitness() * 100 ) / 100   + "%";
      document.getElementById('mutation').innerHTML    += Math.floor($('#rate').val() * 100) + "%";

      document.getElementById('allPhrases').innerHTML += population.allPhrases();

    } else {
      alert("One of the parameters is missing.");
    }

  }
);


$("#clear").click( function(){

    document.getElementById('bestPhrase').innerHTML = "&nbsp;";
    document.getElementById('total').innerHTML      = "";
    document.getElementById('average').innerHTML    = "";
    document.getElementById('mutation').innerHTML   = "";

  }
);
