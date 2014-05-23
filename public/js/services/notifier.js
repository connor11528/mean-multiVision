// Handle notifications
app.value('toastr', toastr)	// prepare toastr lib for DI

app.factory('notifier', ['toastr', function(toastr){

	return {
		notify: function(message){
			toastr.success(message)
			console.log(message)
		},
		error: function(message){
			toastr.error(message)
		}
	}
}])