$(document).ready(function () {
	new Page('new-question', function(question){
		this.main.append($("<h3>New question</h3>"));
	})
});