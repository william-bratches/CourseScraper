var request = require("request");
var fs = require("fs");
var cheerio = require('cheerio');
var _ = require ('underscore');
var JSONArray = [];

var testObj =  { departmentName: 'Religion',
    departmentLink: 'http://www.college.columbia.edu//bulletin/depts/religion.php?tab=courses'};


var getDepartments = function() {
	var departmentObjects = [];
	var deptObj = {};

	request({
		uri: "http://www.college.columbia.edu/bulletin/depts/"
		}, function(error, response, body) {
			var $ = cheerio.load(body);

			$('#Departments_of_Instruction').children().children().children().each(function(){
				console.log(this.text());
				// courseObj.department = this.
				deptObj.departmentName = this.text();
				deptObj.departmentLink = "http://www.college.columbia.edu" + this['0'].attribs.href + '?tab=courses';
				departmentObjects.push(deptObj);
				deptObj = {};

			});
		console.log(departmentObjects)
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
			$('div.course-description strong').each(function(){
				console.log(this.text());
			});
		});
};

getDepartments();
//getCourses(testObj);
