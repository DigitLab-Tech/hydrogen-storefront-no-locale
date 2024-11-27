import {useEffect, useState} from 'react';
import {RiHeartAdd2Line, RiHeart3Fill} from 'react-icons/ri';
import Cookies from 'js-cookie';

export default function AddToWishlist({
  productId,
  size = '25px',
  defaultIsWishlisted = false,
  onRemoveCallback = () => {},
}) {
  const [isWishlisted, setIsWishlisted] = useState(defaultIsWishlisted);

  const getWishlisted = () => {
    return JSON.parse(Cookies.get('wishlisted') ?? '{}');
  };

  const setWishlisted = (object) => {
    Cookies.set('wishlisted', JSON.stringify(object), {
      expires: 365,
      sameSite: 'strict',
    });
  };

  useEffect(() => {
    setIsWishlisted(
      Object.getOwnPropertyNames(getWishlisted()).includes(productId),
    );
  }, [productId]);

  const onAdd = (e) => {
    e.preventDefault();
    const wishlisted = getWishlisted();

    wishlisted[productId] = true;

    setWishlisted(wishlisted);
    setIsWishlisted(true);
  };

  const onRemove = (e) => {
    e.preventDefault();
    const wishlisted = getWishlisted();

    delete wishlisted[productId];

    setWishlisted(wishlisted);
    setIsWishlisted(false);
    onRemoveCallback();
  };

  return isWishlisted ? (
    <button onClick={onRemove}>
      <RiHeart3Fill className="text-black" size={size} />
    </button>
  ) : (
    <button onClick={onAdd}>
      <RiHeartAdd2Line className="text-black" size={size} />
    </button>
  );
}
