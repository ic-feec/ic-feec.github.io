pages['questions'] = function(){

	$(document).ready(function () {
		var listaContainer = $('main');

		yawp('/questions').list(function (data) {
			listaContainer.html("");
			if(data.length == 0){
				listaContainer.html("<h3>Tem questão não!</h3>").
				return;
			}

			for(var i = 0; i < data.length; i++){
				listaContainer.append(questionNode(data[i]));
			}

			listaContainer.find('.question').on('click',function(){
				// document.location.href = 
			});
		});
	});

	function questionNode(question){
		return "<div class='question'>" + question.question + "</div>"
	}

};