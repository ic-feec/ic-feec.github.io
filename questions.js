//load-questions
$(document).ready(function(){

	//coisas mocadas
	var mockQuestions = [];
	mockQuestions.push({
		question: "QUEM NASCEU PRIMEIRO O OVO OU H'?",
		answers: ["A GALINHA", "OZOVO"],
		correctAnswer: 0
	});
	mockQuestions.push({
		question: "HAKATAKAH'?",
		answers: ["A GALINHA", "OZOVO"],
		correctAnswer: 0
	});
	mockQuestions.push({
		question: "QUAL A CAPITAL DA BULGARIA??",
		answers: ["A GALINHA", "OZOVO"],
		correctAnswer: 0
	});
	mockQuestions.push({
		question: "QUAL O MOTIVO DA VIDA?",
		answers: ["A GALINHA", "OZOVO"],
		correctAnswer: 0
	});
	mockQuestions.push({
		question: "A THAISSA TEM QUE DOENSSA?",
		answers: ["POBREMINHA MENTAL", "POBREMINHA"],
		correctAnswer: 0
	});
	
	var listaContainer = $('#questions');
	if(USE_MOCK_DATA){
		for(var i = 0; i < mockQuestions.length; i++){
			listaContainer.append(questionNode(mockQuestions[i]));
		}
		return;
	}

	$.ajax({
		type: "GET",
		url: 'api/quations/all',
		success: function(data) {
			listaContainer.html("");
			if(data.length == 0){
				$('#booklist').html("<h3>Tem questão não!</h3>")
				return;
			}

			for(var i = 0; i < data.length; i++){
				listaContainer.append(questionNode(data[i]));
			}

		},
		error: function(response) {
			Materialize.toast('Error: can\'t load questions!!', 4000);
			console.error("Error: can\'t load questions!!");
			console.error(response.toString());
		}
	});
});



function questionNode(question){
	return "<div class='question'>" + question.question + "</div>"
}