// Handle notifications
app.value('toastr', toastr)	// prepare toastr lib for DI

app.factory('notifier', ['toastr', function(toastr){
	// THIS CODE IS KIND OF STUPID. wraps toastr library in a service
	// globally accessible anyhow
	return {
		notify: function(message){
			toastr.success(message)
		},
		error: function(message){
			toastr.error(message)
		},
		info: function(message){
			toastr.info(message)
		}
	}
}])