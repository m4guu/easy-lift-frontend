interface Gym {
  id: string;
  name: string;
  image: string;
  location: {
    city: string;
    adres: string;
    position: {
      x: number;
      y: number;
    };
  };
}

export default Gym;
