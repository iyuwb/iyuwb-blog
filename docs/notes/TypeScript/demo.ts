type Person = {
    name: string;
    age: number;
  };
  
//   type PersonWithAddress = Person & {
//     address: string;
//   };
  
  interface PersonWithAddress extends Person {
    address: string;
  }