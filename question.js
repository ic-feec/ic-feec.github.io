pages['question'] = function(question){

	$(document).ready(function () {
		var main = $('main');

		main.html('');
		main.append($("<h3>" + question.question + "</h3>"));
		main.append($('<div>' + JSON.stringify(question.answers) + '</div>'));
		main.append($('<div class="result">Loading...</div>'))
		yawp(question.id).get('results').then(function (data) {
			main.find('.result').html(JSON.stringify(data));
		});

		// TODO plot chart, style, etc
	});

};