$(document).ready(function () {
	new Page('new-question', function(question){
		this.main.append($("<h3>New question</h3>"));
		this.main.append($('<input type="text" class="title" placeholder="Title" />'));
		this.main.append($('<input type="text" class="question" placeholder="Question" />'));

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
		this.main.append(button);
	});
});