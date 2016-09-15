$(document).ready(function () {

	var format = function (num3) {
		return parseFloat(Math.round(num3 * 100) / 100).toFixed(2);
	};

	new Page('question', function(parameter){
		yawp('/questions/' + parameter).fetch(function(question){
			var content = $("<div></div>");
			content.addClass('card');
			content.append($("<h3>" + question.question + "</h3>"));
			var ul = $('<ul>');
			question.answers.forEach(function (answer, i) {
				ul.append($('<li class="' + i + '">' + answer + ' <span class="result">0%</span></li>'));
			});
			content.append(ul);
			content.append($('<div class="loading">Loading...</div>'));
			yawp(question.id).get('results').then(function (data) {
				content.find('.loading').html('');
				data.forEach(function (datum, i) {
					content.find('ul li.' + i + ' .result').html(format(datum * 100) + '%');
				});
			});

			var cow = $('<div class="col s10 m8 questions">');
			cow.append(content);

			var row = $('<div class="row">');
			row.append(cow);

			this.main.append(row);
		}.bind(this));
		
			
			
	});
});
