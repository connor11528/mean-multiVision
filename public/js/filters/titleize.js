'use strict'

app.filter('titleize', [function(){
	return function(input, scope){
		if (input != undefined){
			var name = input.split(' '),
				title = [];
			// capitalize each word
			angular.forEach(name, function(word, index){
				title.push(word[0].toUpperCase() + word.substring(1, word.length).toLowerCase())
			})
			// recreate string
			return title.join(' ')
		}
	}
}])