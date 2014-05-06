var request = require("request");
var fs = require("fs");
var cheerio = require('cheerio');
var _ = require ('underscore');
var JSONArray = [];

var testObj =  { departmentName: 'CS',
    departmentLink: 'http://collegecatalog.uchicago.edu/thecollege/computerscience/'};


var getDepartments = function() {
	var departmentObjects = [];
	var deptObj = {};

	request({
		uri: "http://collegecatalog.uchicago.edu/"
		}, function(error, response, body) {
			var $ = cheerio.load(body);

			$('a').each(function(){
				console.log(this.attr('href'));
				deptObj.departmentName = this.text();
				deptObj.departmentLink = "http://collegecatalog.uchicago.edu/" + this['0'].attribs.href;
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

//getDepartments();
getCourses(testObj);
