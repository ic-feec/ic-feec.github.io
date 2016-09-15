var questionOpen;

$(document).ready(function () {
	new Page('questions', function(){
		var content = $("<div class='row'>");
		var column = $("<div class='col s10 m8 questions'><h5>Questions</h5>");
		var card = $("<div class='card'>");
		column.append(card);
		content.append(column);


		yawp('/questions').list(function (questions) {
			if(questions.length == 0){
				card.html('<h6>Tem questão não!</h6>').
				return;
			}
			questions.forEach(function (question) {
				card.append(questionDiv(question));
			});
		});

		function questionDiv(question){
			var div = $('<div>');

			var id = question.id.substring(11);
			var link = $('<a href="#/question:' +  id + '">');
			div.append(link);
			
			div.addClass('question');
			link.text(question.question);

			var waves = $('<div class="waves waves-effect waves-dark">');
			link.append(waves);

			return div;
		}
		this.main.append(content);

	});
});