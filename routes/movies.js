var express = require('express');
var router = express.Router();
const _ = require('lodash');
const axios = require('axios').default;

let movies = [{
	id: "0",
	titre: "Avengers",
	yearOfRelease: "2004",
	duration: "143",
	actors: ["Benoit Paire", "Maximilien Le Berger"],
	poster : "http://lol",
	boxOffice : "14541475",
	rottenTomatoesScore: "78%"

}



];

/* Lien vers la documentation de l'api :

https://web.postman.co/collections/13509697-3a910f96-50ab-4f49-a07b-97bf8df83d74?version=latest&workspace=2c7d3e4f-efc8-4aae-8083-b03660fe6747

*/


//
/* Afficher un film via sonn nom*/
router.get('/test/:nom', function(req, res) {
  var qs = {
    params: {
      t: req.params.nom,
      apikey: '6717538'
    }
  };
  axios.get('http://www.omdbapi.com', qs)
    .then(function (response) {
      // handle success
      const liste = response.data;
      const year = liste.Year;
      const boxOffice = liste.BoxOffice;
      res.status(200).json(liste);
    })
    
});



//Code presque identique à l'exemple fourni dans le cours :



//Afficher tous les films
router.get('/', (req, res) => {
  // Get List of movie and return JSON
  res.status(200).json({ movies });
});

/* afficher un film avec son id*/
router.get('/:id', (req, res) => {
  const { id } = req.params;
  // Find movie in DB
  const movie = _.find(movies, ["id", id]);
  // Return movie
  res.status(200).json({
    movie 
  });
});








/* Ajoute un film */

//http://www.omdbapi.com/?apikey=6717538&t={nomdufilm}

router.put('/', (req, res) => {
  // Create new unique id
  const { title } = req.body;
  const id = _.uniqueId();
  // Insert it in array (normaly with connect the data with the database)

  var qs = {
    params: {
      t: title,
      apikey: '6717538'
    }
  };
pm
  axios.get('http://www.omdbapi.com', qs)
    .then(function (response) {
      // handle success
      const liste = response.data;
      const titre = liste.Title;
      const yearOfRelease = liste.Year;
      const duration = liste.Runtime;
      const actors = liste.Actors;
      const poster = liste.Poster;
      const boxOffice = liste.imdbVotes;
      
      const rottenTomatoesScore = liste.Ratings[1].Value;
     
      console.log(rottenTomatoesScore);
      movies.push({ id, titre, yearOfRelease, duration, actors, poster, boxOffice, rottenTomatoesScore });

       
      res.status(200).json({
    		message: `Just added ${id}`,
    		movie : {titre, id}
    	});
    })
    .catch(()=>{
    	res.status(404).json({
    		message: `erreur`,
    	});
    })

    
});






/* met à jour un film */
router.post('/:id', (req, res) => {
  // Get the :id of the movie we want to update from the params of the request
  const { id } = req.params;
  // Find in DB
  const movieToUpdate = _.find(movies, ["id", id]);
  //console.log(movieToUpdate);
  // Update data with new data (js is by address)

  var qs = {
    params: {
      t: movieToUpdate.titre,
      apikey: '6717538'
    }
  };

  axios.get('http://www.omdbapi.com', qs)
    .then(function (response) {
      // handle success
      const liste = response.data;
      const titre = liste.Title;
      const yearOfRelease = liste.Year;
      const duration = liste.Runtime;
      const actors = liste.Actors;
      const poster = liste.Poster;
      const boxOffice = liste.imdbVotes;
      const rottenTomatoesScore = liste.Ratings[1].Value;
      movie = { id, titre, yearOfRelease, duration, actors, poster, boxOffice, rottenTomatoesScore };
       res.status(200).json({
	    message: `Just updated ${id} :  ${movie}`
	  });
    })

  // Return message
 
});


/* DELETE movie. */
router.delete('/:id', (req, res) => {
  // Get the :id of the movie we want to delete from the params of the request
  const { id } = req.params;

  // Remove from "DB"
  _.remove(movies, ["id", id]);

  // Return message
  res.json({
    message: `Just removed ${id}`
  });
});




module.exports = router;
