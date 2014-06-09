'use strict'

app.factory('CourseCache', ['Course', function(Course){
	var courseList;

	return {
		query: function(){
			if(!courseList){
				courseList = Course.query()
			}

			return courseList
		}
	}
}])