import {useLoaderData, Link} from '@remix-run/react';
import Cookies from '~/lib/cookies';
import {Money, Image} from '@shopify/hydrogen';
import AddToWishlist from '~/components/AddToWishlist';
import {useState} from 'react';

export async function loader({context, request}) {
  const cookies = new Cookies(request.headers.get('Cookie'));
  const wishlisted = cookies.get('wishlisted');

  if (!wishlisted) {
    return {products: []};
  }

  const keys = Object.keys(wishlisted);

  if (!keys.length) {
    return {products: []};
  }

  const data = await context.storefront.query(PRODUCTS_QUERY, {
    variables: {ids: keys},
  });

  return {products: data.nodes};
}

export default function Wishlist() {
  const data = useLoaderData();

  return (
    <div className="grid grid-cols-6 gap-3">
      {data.products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductItem({product}) {
  const productUrl = '/products/' + product.handle;
  const [isVisible, setIsVisible] = useState(true);

  return (
    isVisible && (
      <Link
        className="product-item"
        key={product.id}
        prefetch="intent"
        to={productUrl}
      >
        {product.featuredImage && (
          <Image
            alt={product.featuredImage.altText || product.title}
            aspectRatio="1/1"
            data={product.featuredImage}
            sizes="80px"
          />
        )}
        <div className="grid justify-center text-center">
          <div className="flex gap-1 justify-center">
            <h4>{product.title}</h4>
            <AddToWishlist
              productId={product.id}
              defaultIsWishlisted={true}
              onRemoveCallback={() => {
                setIsVisible(false);
              }}
            />
          </div>
          <small>
            <Money data={product.priceRange.minVariantPrice} />
          </small>
        </div>
      </Link>
    )
  );
}

const PRODUCTS_QUERY = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }

  query Products($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        id
        title
        handle
        featuredImage{
          url(transform: {maxHeight: 200, maxWidth: 200})
        }
        priceRange {
          minVariantPrice {
            ...MoneyProductItem
          }
          maxVariantPrice {
            ...MoneyProductItem
          }
        }
      }
    }
  }
`;
