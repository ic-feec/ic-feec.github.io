$(document).ready(function () {

	var format = function (num3) {
		return parseFloat(Math.round(num3 * 100) / 100).toFixed(2);
	};

	var randomColor = function() {
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
		    color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	};

	new Page('question', function(parameter) {
		yawp('/questions/' + parameter).fetch(function(question) {
			var content = $("<div></div>");
			content.addClass('card');
			content.append($("<h3>" + question.title + "</h3>"));
			content.append($("<span>" + question.question + "</span>"));
			var ul = $('<ul>');
			question.answers.forEach(function (answer, i) {
				ul.append($('<li class="' + i + '">' + answer + ' <span class="result"></span></li>'));
			});
			content.append(ul);
			content.append($('<canvas id="chart" />'));

			yawp(question.id).get('results').then(function (data) {
				if (!Array.isArray(data)) {
					content.find('ul li .result').text('-');
					return;
				}
				var colors = data.map(randomColor);
				var chart = new Chart(content.find('#chart'), {
					type: 'doughnut',
					data: {
						labels: question.answers,
						datasets: [{
							data : data,
							backgroundColor : colors,
							hoverBackgroundColor : colors
						}]
					}
				});
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
