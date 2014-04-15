mkdir -p build
mkdir -p report
mkdir -p doc
npm config set cache /usr/share/tomcat7/.jenkins/npm-cache
npm install
grunt
istanbul cover _mocha **test/*.js -- -R spec
/etc/sonar-runner/bin/sonar-runner