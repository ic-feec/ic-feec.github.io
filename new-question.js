$(document).ready(function () {
	new Page('new-question', function(question){
		var content = $("<div class='row'>");
		var column = $("<div class='col s10 m8 questions'><h5>New question</h5>");
		var card = $("<div class='card'>");
		column.append(card);
		content.append(column);

		card.append($('<input type="text" class="title" placeholder="Title" />'));
		card.append($('<input type="text" class="question" placeholder="Question" />'));

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