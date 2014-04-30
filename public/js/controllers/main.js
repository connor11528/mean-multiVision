'use strict';

app.controller('mainCtrl', function($scope){
	$scope.courses = [
    {name: 'C# for Sociopaths', featured: true, published: new Date('10/5/2013')},
    {name: 'C# for Non-Sociopaths', featured: true, published: new Date('10/12/2013')},
    {name: 'Super Duper Expert C#', featured: false, published: new Date('10/1/2013')},
    {name: 'Visual Basic for Visual Basic Developers', featured: false, published: new Date('7/12/2013')},
    {name: 'Pedantic C++', featured: true, published: new Date('1/1/2013')},
    {name: 'JavaScript for People over 20', featured: true, published: new Date('10/13/2013')},
    {name: 'Maintainable Code for Cowards', featured: true, published: new Date('3/1/2013')}
    ];
})