import { Button } from "@mantine/core";
import { CardButtonCart } from "../../assets/icons/CardButtonCart";
import styles from "./CardButton.module.scss";
import { useCart } from "../../contexts/CartContext";
import type { Product } from "../../types/product";

interface CardButtonProps {
  product: Product;
  quantity: number;
}

export function CardButton({ product, quantity }: CardButtonProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <Button
      variant="filled"
      color="#E7FAEB"
      className={styles.cardButton}
      c="#3B944E"
      onClick={handleAddToCart}
    >
      Add to cart
      <CardButtonCart />
    </Button>
  );
}
