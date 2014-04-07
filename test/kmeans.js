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
  
	describe('#cluster() - error path 1', function(){
		it('should throw an error', function(){		  
			(function() {
				var failedKmeans = new clustering.KMeans();

				failedKmeans.cluster(input);
			}).should.throw();
		});
	});
  
	describe('#cluster() - error path 2', function(){
		it('should throw an error', function(){
			(function() {
				kmeans.cluster();
			}).should.throw();
		});
	});
  
	describe('#classify() - success path', function(){
		it('should return a valid cluster number', function(){
			var clusterNumber = kmeans.classify(input[0]);
			(clusterNumber).should.be.above(-1);
			(clusterNumber).should.be.below(k);
		});
	});
	
	describe('#classify() - error path 1', function(){
		it('should throw an error', function(){
			(function() {
				kmeans.classify();
			}).should.throw();
		});
	});
	
	describe('#classify() - error path 2', function(){
		it('should throw an error', function(){
			(function() {
				var notClusteredKmeans = new clustering.KMeans(k, e);
	
				notClusteredKmeans.classify(input[0]);
			}).should.throw();
		});
	});
	
	
    describe('#getClusters()', function(){
		it('should return k clusters', function(){
			(kmeans.getClusters().length).should.be.exactly(k);
		});
	});
	
    describe('#getJson()', function(){
		it('should return a valid JSON', function(){
		  var json = JSON.parse(kmeans.getJson());
		  
		  (json.k).should.be.exactly(k);
		  (json.error).should.be.below(e);
		  (json.e).should.be.exactly(e);
		  (json.ready).should.be.exactly(true);
		  (json.loaded).should.be.exactly(true);
		  (json.centroids.length).should.be.exactly(k);
		  (json.clusters.length).should.be.exactly(k);
		  (json.timestamp).should.not.be.empty;
		});
	});
	
    describe('#loadJson()', function(){
		it('should configure a KMeans object based on a valid JSON', function(){
		  var json = JSON.parse(kmeans.getJson());
		  var newKmeans = new clustering.KMeans();
		  
		  newKmeans.loadJson(kmeans.getJson());
		  
		  var newJson = JSON.parse(newKmeans.getJson());
		  
		  (json.k).should.be.exactly(newJson.k);
		  (json.error).should.be.exactly(newJson.error);
		  (json.e).should.be.exactly(newJson.e);
		  (json.ready).should.be.exactly(newJson.ready);
		  (json.loaded).should.be.exactly(newJson.loaded);
		  (json.centroids.length).should.be.exactly(newJson.centroids.length);
		  (json.clusters.length).should.be.exactly(newJson.clusters.length);
		  (newJson.timestamp).should.not.be.empty;
		});
	});

});
