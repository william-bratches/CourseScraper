var request = require("request");
var fs = require("fs");
var cheerio = require('cheerio');
var _ = require ('underscore');
var JSONArray = [];

//var testObj =  { departmentName: 'CS',
//    departmentLink: 'http://www.registrar.northwestern.edu/courses/wcas_ycp.html'};
"""
ran into a roadblock with this script. Every single department seems to have its own unique website. I'm going to focus on the other more
consistent schools at NWU and see if I can find the consolidated course catalog elsewhere -pdf2html seems like a good solution.
"""

var getDepartments = function() {
	var departmentObjects = [];
	var deptObj = {};

	request({
		uri: "http://www.registrar.northwestern.edu/courses/wcas_ycp.html"
		}, function(error, response, body) {
			var $ = cheerio.load(body);

			$('a').each(function(){
				var courseLink = this.attr('href');
				console.log(courseLink);
				deptObj.departmentName = this.text();
				deptObj.departmentLink = courseLink;
				departmentObjects.push(deptObj);
				deptObj = {};

			});
		});
};

var getCourses = function(Obj){
	var deptObj = Obj;
	deptObj['courses'] = [];
	var courseObj = {};

	request({
		uri: deptObj.departmentLink
		}, function(error, response, body) {
			var $ = cheerio.load(body);
			$('tbody').each(function(){
				console.log(this.text());
			});
		});
};

getDepartments();
//getCourses(testObj);
