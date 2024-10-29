import {employees} from '~/data/employes';

export default function Abc() {
  return (
    <>
      <h1>Hello</h1>
      {employees.map((employe) => (
        <img key={employe.key} src={employe.profilePicture} alt="Profile"></img>
      ))}
    </>
  );
}
