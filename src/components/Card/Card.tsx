import { CardButton } from "../CardButton/CardButton";
import { Stepper } from "../Stepper/Stepper";
import styles from "./Card.module.scss";
import type { Product } from "../../types/product";
import { useState } from "react";

interface CardProps {
  product: Product;
}

export function Card({ product }: CardProps) {
  const [quantity, setQuantity] = useState(1);

  const splitProductName = (productName: string) => {
    const parts = productName.split(" - ");
    return {
      productName: parts[0] || productName,
      productWeight: parts[1] || "",
    };
  };

  const { productName, productWeight } = splitProductName(product.name);

  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.name} width={276} height={276} />
      <div className={styles.productInfoContainer}>
        <p className={styles.name}>
          <span className={styles.spanName}>{productName}</span>
          <span className={styles.weight}>{productWeight}</span>
        </p>
        <Stepper
          value={quantity}
          onValueChange={setQuantity}
          className={styles.cardStepper}
        />
      </div>
      <div className={styles.productPriceContainer}>
        <p className={styles.price}>${product.price}</p>
        <CardButton product={product} quantity={quantity} />
      </div>
    </div>
  );
}
