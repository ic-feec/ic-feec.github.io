$(document).ready(function () {

	var row = function () {
		var row = $('<div class="row">');
		var args = Array.prototype.slice.call(arguments);
		args.forEach(function (arg) {
			row.append(arg);
		});
		return row;
	};

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
			var content = $('<div class="row">');
			var column = $('<div class="col s10 m8 questions"><h5>' + question.title + '</h5>');
			var card = $('<div class="card">');
			column.append(card);
			content.append(column);

			card.append(row($('<span/>')));
			card.append(row($('<span class="col s12">' + question.question + '</span>')));
			card.append(row($('<span class="col s12">' + question.creationDate + '</span>')));
			var ul = $('<ul class="col s12">');
			question.answers.forEach(function (answer, i) {
				ul.append($('<li class="' + i + '">' + answer + ' <span class="result"></span></li>'));
			});
			card.append(row(ul));
			card.append($('<canvas id="chart" />'));

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

			this.main.append(content);
		}.bind(this));
		
			
			
	});
});
