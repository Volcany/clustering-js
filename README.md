clusteringjs
============

K-Means
-------

A Node.js K-Means implementation.

**How to use**

1. Install the module
> npm install clusteringjs

2. Create a K-Means object
> var clustering = require('clusteringjs');
> 
> var kmeans = new clustering.KMeans(k, e); // k = numer of clusters, e = max error

3. Cluster something
> kmeans.cluster(input); // input = array of points

4. Use the cluster
> var clusters = kmeans.getClusters();
> var cluster = kmeans.classify(point); // point = [x, y]

http://en.wikipedia.org/wiki/K-means_clustering