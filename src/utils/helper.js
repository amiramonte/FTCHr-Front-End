let deployed = false;

<<<<<<< HEAD
let prefixURL = (deployed) ? 'https://ftchrbackend.herokuapp.com' : 'http://localhost:3001'

export default prefixURL; 
=======
let prefixURL = deployed
  ? "https://ftchrbackend.herokuapp.com"
  : "http://localhost:3001";

export default prefixURL;
>>>>>>> dev
