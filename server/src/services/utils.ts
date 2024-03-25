const randomOTPGenerator = () => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  return otp;
};

const randomPasswordGenerator = () => {
  const password = Math.random().toString(36).slice(-8);
  return password;
};

export { randomOTPGenerator, randomPasswordGenerator };
