$(document).ready(function () {

	var row = function (el) {
		var row = $('<div class="row">');
		row.append(el);
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
		var newAnswer = $('<span class="add-answer">Add answer</span>');
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
		card.append($('<input type="radio" name="correctAnswer" id="-1" /><label for="-1">No correct answer</label></span>'));
		card.append(newAnswer);

		var button = $('<a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></a>');
		button.on('click', function () {
			yawp('/questions').create({
				title : this.main.find('.title').val(),
				question : this.main.find('.question').val(),
				answers : [ 'asd', '123', 'hue' ],
				finished : true
			}).then(function (q) {
				console.log('success', q);
			});
		});
		card.append(button);

		this.main.append(content);
	});
});