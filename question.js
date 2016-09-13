$(document).ready(function () {
	new Page('question', function(parameter){
		yawp('/questions/' + parameter).fetch(function(question){
			var content = $("<div></div>");
			content.append($("<h3>" + question.question + "</h3>"));
			content.append($('<div>' + JSON.stringify(question.answers) + '</div>'));
			content.append($('<div class="result">Loading...</div>'))
			yawp(question.id).get('results').then(function (data) {
				content.find('.result').html(JSON.stringify(data));
			});
			this.main.append(content);
		}.bind(this));
		
			
			
	});
});