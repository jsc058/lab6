'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
 // $("testjs").click(function(e)) {}
 // $.get("/project/", addProjectDetails);
 // }

function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

  $.get("/project/" + idNumber, callBackFn);

	console.log("User clicked on project " + idNumber);
	console.log("URL is /project/" + idNumber);

	$("#project" + idNumber).html

}

function callBackFn(result) {
	console.log(result);

	var detailHTML =
		'<img src="' + result['image'] + '" class="detailsImage">' +
		'<p>' + result['title'] + '</p>' +
		'<p><small>' + result['date'] + '</small></p>' +
		'<p><small>' + result['summary'] + '</small></p>';
		//console.log(detailHTML);

	$("#project" + result['id'] + " .details").html(detailHTML);
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	console.log("User clicked on color button");
	$.get("/palette", callBackFnColor);
}

function callBackFnColor(result) {
	console.log(result);
	var colors0 = result['colors'];
	var colors = colors0.hex;
	console.log(colors);
	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}
