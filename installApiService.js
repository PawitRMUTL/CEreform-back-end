var Service = require('node-windows').Service;
 
// Create a new service object
var svc = new Service({
  name:'3cx-fujitsu-api',
  description: 'The api server for toyota-buzz project.',
  script: 'C:\\3CX-Addons\\3cx-toyota-buzz-api\\toyota-buzz-api.js' 
});
 
// Listen for the 'install' event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});
 
// install the service
svc.install();