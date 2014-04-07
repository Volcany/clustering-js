module.exports = KMeans;

function KMeans(k, e) {
	this.ready = false;
	this.k = k;
	this.e = e;
	this.loaded = (typeof k != 'undefined' && k !== null) &&
					(typeof e != 'undefined' && e !== null);
}

KMeans.prototype.cluster = function (input) {
	validateLoadState(this.loaded);
	validateInput(input);

	var centroidTotal = this.k;
	var e = this.e;
	
	var centroids = createRandomCentroids(centroidTotal, input);
	var clusters = createClusters(centroidTotal, input, centroids);

	var error = e;
	while (error >= e) {
		error = renewCentroids(clusters, centroids);
		clusters = createClusters(centroidTotal, input, centroids);	
	}

	this.error = error;
	this.centroids = centroids;
	this.clusters = clusters;
	this.ready = true;
};

KMeans.prototype.classify = function (point) {
	if (!this.ready) {
		throw new Error('Run cluster() first');
	}
	if (point === null || typeof point.length == 'undefined') {
		throw new Error('Invalid point');
	}
	
	var number = 0;
	var nearestDistance = null;
	
	for (var i = 0; i < this.centroids.length; i++) {
		var centroid = this.centroids[i];
		var distance = calculatePointDistance(centroid, point);
		
		if (nearestDistance === null || distance < nearestDistance) {
			nearestDistance = distance;
			number = i;
		}
	}
	
	return number;
};

KMeans.prototype.getClusters = function () {
	return this.clusters;
};

KMeans.prototype.getJson = function () {
	var json = {
		k: this.k,
		e: this.e,
		error: this.error,
		ready: this.ready,
		loaded: this.loaded,
		centroids: this.centroids,
		clusters: this.clusters,
		timestamp: new Date()
	};
	
	return JSON.stringify(json);
};

KMeans.prototype.loadJson = function (json) {
	var config = JSON.parse(json);
	
	this.k = config.k;
	this.e = config.e;
	this.error = config.error;
	this.loaded = config.loaded;
	this.ready = config.ready;
	this.centroids = config.centroids;
	this.clusters = config.clusters;
};

function calculatePointDistance(point1, point2) {
	var xs = point2[0] - point1[0];
	xs = xs * xs;
	
	var ys = point2[1] - point1[1];
	ys = ys * ys;
	
	var distance = Math.sqrt(xs + ys);
	
	return distance;
}

function validateInput(input) {
	if (input === null || input.length === 'undefined') {
		throw new Error('Invalid input');
	}
}

function validateLoadState(isLoaded) {
	if (isLoaded === 'undefined' || !isLoaded) {
		throw new Error(
			'The configuration is not loaded yet. Try KMeans#loadJson() first'
		);
	}
}

function createRandomCentroids(centroidTotal, input) {
	var centroids = new Array(centroidTotal);
	var selectedInputForCentroid = new Array(centroidTotal);
	var inputTotal = input.length;
	
	// Phase I - Random centroids
	for (var i = 0; i < centroids.length; i++) {
		var random = Math.floor(inputTotal * Math.random());
		
		while (random in selectedInputForCentroid) {
			random = Math.floor(inputTotal * Math.random());
		}
		
		centroids[i] = input[random];
		selectedInputForCentroid[random] = true;
	}
	
	return centroids;
}

function createClusters(clusterTotal, input, centroids) {
	// Phase II - Initial clusters
	var clusters = new Array(clusterTotal);
	var i;
	
	for (i = 0; i < clusterTotal; i++) {
		clusters[i] = [];
	}

	for (i = 0; i < input.length; i++) {
		var point = input[i];
		var nearestDistance = null;
		var nearestCluster = 0;
		
		for (var j = 0; j < centroids.length; j++) {
			var centroid = centroids[j];
			
			var distance = calculatePointDistance(centroid, point);
			
			if (j === 0) {
				nearestDistance = distance;
			}
			else if (distance < nearestDistance) {
				nearestDistance = distance;
				nearestCluster = j;
			}
		}
		
		var cluster = clusters[nearestCluster];
		cluster.push(point);
	}	
	
	return clusters;
}

function renewCentroids(clusters, centroids) {
	// Phase III - Recalculate centroids
	var error = 0;
	
	for (var i = 0; i < clusters.length; i++) {
		var sumX = 0;
		var sumY = 0;

		for (var j = 0; j < clusters[i].length; j++){
			sumX += clusters[i][j][0];
			sumY += clusters[i][j][1];
		}
		
		var count = clusters[i].length;
		
		var x = 0; 
		var y = 0; 
		
		if (count > 0) {
			x = sumX / count;
			y = sumY / count;
		}
		
		var xs = x - centroids[i][0];
		xs = xs * xs;
		
		var ys = y - centroids[i][1];
		ys = ys * ys;
		
		error += Math.sqrt(xs + ys);
		
		centroids[i] = [];
		centroids[i] = [ x, y ];
	}
	
	return error;
}