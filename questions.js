pages['questions'] = function(){

	$(document).ready(function () {
		var main = $('main');

		yawp('/questions').list(function (questions) {
			if(questions.length == 0){
				main.html('<h3>Tem questão não!</h3>').
				return;
			}

			main.html('');
			questions.forEach(function (question) {
				main.append(questionDiv(question));
			});
		});
	});

	function questionDiv(question){
		var div = $('<div>');
		div.addClass('question');
		div.on('click', function(){
			pages['question'](question);
		});
		div.text(question.question);
		return div;
	}

};