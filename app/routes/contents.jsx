import {useLoaderData} from '@remix-run/react';
import DynamicContents from '~/components/DynamicContents';
import {DYNAMIC_CONTENTS_QUERY} from '~/graphql/DynamicContents';

export async function loader({context}) {
  const data = await context.storefront.query(DYNAMIC_CONTENTS_QUERY);

  return {dynamicContents: data?.metaobjects?.nodes ?? []};
}

export default function Contents() {
  const data = useLoaderData();

  return <DynamicContents contents={data.dynamicContents} />;
}
