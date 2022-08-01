/**
 * Exercise 01: The Retro Movie Store
 * Implement a shopping cart with the next features for the Movie Store that is selling retro dvds:
 * 1. Add a movie to the cart
 * 2. Increment or decrement the quantity of movie copies. If quantity is equal to 0, the movie must be removed from the cart
 * 3. Calculate and show the total cost of your cart. Ex: Total: $150
 * 4. Apply discount rules. You have an array of offers with discounts depending of the combination of movie you have in your cart.
 * You have to apply all discounts in the rules array (discountRules).
 * Ex: If m: [1, 2, 3], it means the discount will be applied to the total when the cart has all that products in only.
 *
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import "./assets/styles.css";
import { useEffect, useState } from "react";

export default function Exercise01() {
  const movies = [
    {
      id: 1,
      name: "Star Wars",
      price: 20,
      quantity: 0,
    },
    {
      id: 2,
      name: "Minions",
      price: 25,
      quantity: 0,
    },
    {
      id: 3,
      name: "Fast and Furious",
      price: 10,
      quantity: 0,
    },
    {
      id: 4,
      name: "The Lord of the Rings",
      price: 5,
      quantity: 0,
    },
  ];

  const discountRules = [
    {
      m: [3, 2],
      discount: 0.25,
    },
    {
      m: [2, 4, 1],
      discount: 0.5,
    },
    {
      m: [4, 2],
      discount: 0.1,
    },
  ];

  const [cart, setCart] = useState([]);
  //const [quantity, setQuantity] = useState(0);
  const [decrementQuantity, setDecrementQuantity] = useState(0);
  const [summ, setSuma] = useState(0);
  const [apliDesciunt, setApliDiscount] = useState(false);
  const [totalcart, setTotalCart] = useState(0);
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [precioNormal, setPrecioNormal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [priceDiscount, setPriceDiscount] = useState(0);

  const getTotal = () => {
    setLoading(true);
    let moviesCart = [];
    cart.map((el) => moviesCart.push(el.id));
    if (JSON.stringify(moviesCart) === JSON.stringify(discountRules[0].m)) {
      setDiscount(0.25);
      setDisabled(false);
    } else if (
      JSON.stringify(moviesCart) === JSON.stringify(discountRules[1].m)
    ) {
      setDiscount(0.5);
      setDisabled(false);
    } else if (
      JSON.stringify(moviesCart) === JSON.stringify(discountRules[2].m)
    ) {
      setDiscount(0.1);
      setDisabled(false);
    } else {
      setApliDiscount(false);
      setDisabled(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    getTotal();
  }, [cart, precioNormal]);

  const getDiscount = () => {
    if (discount !== 0) {
      //setSuma(summ * apliDesciunt);
      setApliDiscount(true);
      setPriceDiscount(precioNormal * discount);
      //setApliDiscount(0);
      setDisabled(true);
    }
    setDisabled(true);
  };

  const AddCard = (item, index) => {
    console.log(item.id);
    const data = cart.map((el) => el.id);
    if (data.includes(item.id)) {
      setCart([...cart]);
    } else {
      setCart([
        ...cart,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity + 1,
        },
      ]);

      setPrecioNormal(precioNormal + item.price);
    }
  };

  const lessQuantity = (x, index) => {
    if (x.quantity > 0) {
      cart[index].quantity = x.quantity - 1;
      setCart(cart);
    }
    if (apliDesciunt) {
      setPriceDiscount(priceDiscount - x.price * discount);
    } else {
      setPrecioNormal(precioNormal - x.price);
    }

    if (cart[index].quantity === 0) {
      cart.splice(index, 1);
      let newsuma = 0;
      cart.map((el) => {
        newsuma = newsuma + el.price * el.quantity;
        setPrecioNormal(newsuma);
      });
    }

    if (cart.length === 0) {
      setPrecioNormal(0);
      setPriceDiscount(0);
    }
  };

  const moreQuantity = (x, index) => {
    console.log(cart);
    cart[index].quantity = x.quantity + 1;
    setCart(cart);
    if (apliDesciunt) {
      setPriceDiscount(priceDiscount + x.price * discount);
    } else {
      setPrecioNormal(precioNormal + x.price);
    }
  };

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((o, index) => (
            <li className="movies__list-card">
              <ul>
                <li>ID: {o.id}</li>
                <li>Name: {o.name}</li>
                <li>Price: ${o.price}</li>
              </ul>
              <button onClick={() => AddCard(o, index)}>Add to cart</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map((x, index) => (
            <li className="movies__cart-card">
              <ul>
                <li>ID: {x.id}</li>
                <li>Name: {x.name}</li>
                <li>Price: ${x.price}</li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => lessQuantity(x, index)}>-</button>
                <span>{x.quantity}</span>
                <button onClick={() => moreQuantity(x, index)}>+</button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${!apliDesciunt ? precioNormal : priceDiscount}</p>
          <div className="movies__cart-card-discount">
            <button disabled={disabled} onClick={() => getDiscount()}>
              verify discount :)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
