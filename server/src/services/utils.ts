import * as os from 'os';

const randomOTPGenerator = () => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  return otp;
};

const randomPasswordGenerator = () => {
  const password = Math.random().toString(36).slice(-8);
  return password;
};


const getIPAddress = (): string => {
  // Get the network interfaces
  const networkInterfaces = os.networkInterfaces();

  // Extract the IPv4 address from the network interfaces
  const ipv4Addresses: string[] = [];
  for (const interfaceName in networkInterfaces) {
    if (Object.prototype.hasOwnProperty.call(networkInterfaces, interfaceName)) {
      const interfaces = networkInterfaces[interfaceName];
      for (const iface of interfaces?.filter(Boolean) || []){
        if (iface.family === 'IPv4' && !iface.internal) {
          ipv4Addresses.push(iface.address);
        }
      }
    }
  }

  console.log('IPv4 Addresses:', ipv4Addresses[0]);
  return ipv4Addresses[0] || '';
};


export { randomOTPGenerator, randomPasswordGenerator, getIPAddress };
