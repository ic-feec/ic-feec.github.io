$(document).ready(function () {

	var row = function () {
		var row = $('<div class="row">');
		var args = Array.prototype.slice.call(arguments);
		args.forEach(function (arg) {
			row.append(arg);
		});
		return row;
	}

	new Page('new-question', function(question){
		var content = $("<div class='row'>");
		var column = $("<div class='col s10 m8 questions'><h5>New question</h5>");
		var card = $("<div class='card'>");
		column.append(card);
		content.append(column);

		card.append(row($('<input type="text" class="title" placeholder="Title" />')));
		card.append(row($('<input type="text" class="question" placeholder="Question" />')));

		card.append(row($('<span>Answers</span>')));
		card.append(row($('<div class="answers col s12">')));

		var i = 0;
		var newAnswer = $('<a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></a>');
		newAnswer.on('click', function () {
			var answer = $('<div class="answer row">');
			answer.append($('<span class="col s10"><input type="text" placeholder="Answer" /></span>'));
			answer.append($('<span class="col s1"><input type="radio" name="correctAnswer" id="' + i + '" /><label for="' + i++ + '"> Correct</label></span>'));
			var x = $('<span class="col s1">X</span>');
			x.on('click', function () {
				answer.remove();
			});
			answer.append(x);
			card.find('.answers').append(answer);
		}).trigger('click');
		card.append(row($('<input type="radio" name="correctAnswer" id="-1" /><label for="-1">No correct answer</label></span>')));

		var button = $('<a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">send</i></a>');
		button.on('click', function () {
			var answers = this.main.find('.answer').map(function () {
				return {
					val : $(this).find('input[type=text]').val(),
					correct : $(this).find('input[type=radio]').is(':checked')
				};
			}).get();
			yawp('/questions').create({
				title : this.main.find('.title').val(),
				question : this.main.find('.question').val(),
				answers : answers.map(function (ans) { return ans.val; }),
				correctAnswer : answers.map(function (ans) { return ans.correct; }).indexOf(true),
				finished : true
			}).then(function (q) {
				console.log('success', q);
				window.location.hash = '/questions';
			});
		}.bind(this));
		var fabs = row(newAnswer, button);
		fabs.css('text-align', 'right');
		card.append(fabs);

		this.main.append(content);
	});
});