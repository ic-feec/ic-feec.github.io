//load-questions
$(document).ready(function () {
	var listaContainer = $('#questions');

	yawp('/questions').list(function (data) {
		listaContainer.html("");
		if(data.length == 0){
			$('#booklist').html("<h3>Tem questão não!</h3>")
			return;
		}

		for(var i = 0; i < data.length; i++){
			listaContainer.append(questionNode(data[i]));
		}
	});
});

function questionNode(question){
	return "<div class='question'>" + question.question + "</div>"
}