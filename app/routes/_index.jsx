import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import IconWithText from '~/components/IconWithText';
import {SlEyeglass, SlBadge, SlAnchor} from 'react-icons/sl';
import IconWithTexts from '~/components/IconWithTexts';
import AddToWishlist from '~/components/AddToWishlist';
import {AddToCartButton} from '~/components/AddToCartButton';
import {useAside} from '~/components/Aside';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'chronos | Home'}];
};

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({...deferredData, ...criticalData});
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {LoaderFunctionArgs}
 */
async function loadCriticalData({context}) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {LoaderFunctionArgs}
 */
function loadDeferredData({context}) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();

  return (
    <div className="home">
      <FeaturedCollection collection={data.featuredCollection} />
      <IconWithTexts>
        <IconWithText
          className="py-[150px] text-black"
          text="Our expert carefully choose our watches for you!"
        >
          <SlEyeglass size="100px" />
        </IconWithText>
        <IconWithText
          className="bg-primary py-[150px] text-white"
          text="Our product are certified!"
        >
          <SlBadge size="100px" />
        </IconWithText>
        <IconWithText
          className="py-[150px] text-black"
          text="We are importing from all around the world!"
        >
          <SlAnchor size="100px" />
        </IconWithText>
      </IconWithTexts>
      <RecommendedProducts products={data.recommendedProducts} />
    </div>
  );
}

/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
function FeaturedCollection({collection}) {
  if (!collection) return null;

  const image = collection?.image;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 items-center sm:justify-items-center bg-gray py-12 px-6 sm:py-3">
      <div className="grid gap-3 max-w-[600px]">
        <h1 className="text-6xl">{collection.title}</h1>
        <span>{collection.description}</span>
        <Link className="rounded bg-primary p-3 text-white w-fit font-bold">
          Get a look
        </Link>
      </div>
      <div className="hidden sm:block">
        {image && (
          <div className="max-w-[600px]">
            <Image data={image} sizes="50vw" />
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery | null>;
 * }}
 */
function RecommendedProducts({products}) {
  const {open} = useAside();

  return (
    <div className="grid bg-gray gap-8 p-12">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 gap-y-6 justify-items-center">
              {response
                ? response.products.nodes.map((product) => {
                    return (
                      <div key={product.id}>
                        <Link
                          className="recommended-product font-bold text-center max-w-[350px] relative"
                          to={`/products/${product.handle}`}
                        >
                          <Image
                            data={product.images.nodes[0]}
                            aspectRatio="1/1"
                            sizes="(min-width: 45em) 20vw, 50vw"
                          />
                          <div className="flex gap-1 justify-center">
                            <h4>{product.title}</h4>
                            <AddToWishlist productId={product.id} />
                          </div>
                          <small>
                            <Money data={product.priceRange.minVariantPrice} />
                          </small>
                        </Link>
                        <AddToCartButton
                          onClick={() => {
                            open('cart');
                          }}
                          lines={[
                            {
                              merchandiseId: product.variants.nodes[0].id,
                              quantity: 1,
                              selectedVariant: product.variants.nodes[0],
                            },
                          ]}
                        >
                          Add to cart
                        </AddToCartButton>
                      </div>
                    );
                  })
                : null}
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    description
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 1){
      nodes{
        id
        selectedOptions {
          name
          value
        }
        product {
          handle
        }
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
