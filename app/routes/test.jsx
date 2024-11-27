import {useLoaderData} from '@remix-run/react';

export async function loader({context}) {
  const data = await context.storefront.query(QUERY);
  return {test: data};
}

export default function Test() {
  const data = useLoaderData();

  console.log(data);
  return <div>test</div>;
}

const QUERY = `#graphql
  query test {
    metaobjects(first: 10, type: "test") {
      nodes {
        name: field(key: "name") {
          value
        }
      }
    }
  }
  
`;
