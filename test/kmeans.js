var clustering = require('../index.js');
var assert = require('assert');
var should = require('should');

var k = 5;
var e = 0.1;
var inputSize = 50;
var input = new Array();

for (var i = 0; i < inputSize; i++) {
	var max = Math.pow(10, (Math.round(i/10)+1));
	
	var x = Math.floor(max * Math.random());
	var y = Math.floor(max * Math.random());
	
	input.push([x, y]);
}

var kmeans = new clustering.KMeans(k, e);

describe('KMeans', function(){
	describe('#cluster() - success path', function(){
		it('should cluster without errors', function(){
		  kmeans.cluster(input);
		});
	});
  
	describe('#cluster() - error path', function(){
		it('should throw an error', function(){
			(function() {
				kmeans.cluster();
			}).should.throw();
		});
	});
  
    describe('#getClusters()', function(){
		it('should return k clusters', function(){
			(kmeans.getClusters().length).should.be.exactly(k);
		});
	});
	
    describe('#getJson()', function(){
		it('should return a valid JSON script', function(){
		  var json = JSON.parse(kmeans.getJson());
		  
		  (json.k).should.be.exactly(k);
		  (json.maxError).should.be.exactly(e);
		  (json.e).should.be.below(e);
		  (json.ready).should.be.exactly(true);
		  (json.centroids.length).should.be.exactly(k);
		  (json.clusters.length).should.be.exactly(k);
		  (json.timestamp).should.not.be.empty;
		});
	});
});
