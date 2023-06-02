
var Service = require('node-windows').Service;
 
// Create a new service object
var svc = new Service({
  name:'3cx-fujitsu-api',
  description: 'The api server for toyota-buzz project.',
  script: 'C:\\3CX-Addons\\3cx-toyota-buzz-api\\toyota-buzz-api.js'
});
 
// Listen for the 'uninstall' event so we know when it is done.
svc.on('uninstall',function(){
  console.log('Uninstall complete.');
  console.log('The service exists: ',svc.exists);
 
});
 
// Uninstall the service.
svc.uninstall();