function Helpers() {
  const generateId = () => {
    return Math.floor(Math.random() * 10001);
  };
  return { generateId };
}

export default Helpers;
