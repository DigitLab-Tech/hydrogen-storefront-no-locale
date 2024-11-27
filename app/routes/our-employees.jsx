import {useLoaderData} from '@remix-run/react';

export async function loader({context}) {
  const data = await context.storefront.query(EMPLOYEES_QUERY);
  return {employees: data.metaobjects.nodes};
}

export default function OurEmployees() {
  const {employees} = useLoaderData();

  return (
    <div>
      <h1>OurEmployees</h1>
      <div className="grid grid-cols-3 gap-4">
        {employees.map(
          ({id, firstname, lastname, email, age, position, salary}) => (
            <div key={id} className="border rounded-lg p-3">
              <h2>
                {firstname.value} {lastname.value}
              </h2>
              <p>{email.value}</p>
              <p>{age.value}</p>
              <p>{position.value}</p>
              <p>{salary.value}</p>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

const EMPLOYEES_QUERY = `#graphql
    query employees {
        metaobjects(first: 250, type: "employe") {
            nodes {
                id
                firstname: field(key: "firstname"){
                    value
                }
                lastname: field(key: "lastname"){
                    value
                }
                profilePicture: field(key: "profile_picture"){
                    value
                }
                age: field(key: "age"){
                    value
                }
                position: field(key: "position"){
                    value
                }
                salary: field(key: "salary"){
                    value
                }
                email: field(key: "email"){
                    value
                }
            }
        }
    }
`;
