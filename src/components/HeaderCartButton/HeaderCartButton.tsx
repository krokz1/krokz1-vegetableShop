import { Button } from "@mantine/core";
import { Cart } from "../../assets/icons/Cart";
import styles from "./HeaderCartButton.module.scss";
import { useCart } from "../../contexts/CartContext";
import { ModalCart } from "../ModalCart/ModalCart";
import { useDisclosure } from "@mantine/hooks";

export function HeaderCartButton() {
  const { getTotalItems } = useCart();
  const [opened, { open, close }] = useDisclosure(false);

  const totalItems = getTotalItems();

  return (
    <>
      <Button
        variant="filled"
        color="#54B46A"
        size="md"
        radius="sm"
        className={styles.headerCartButton}
        onClick={open}
      >
        <p className={styles.headerCartText}>Cart</p>
        {totalItems > 0 && (
          <span className={styles.cartBadge}>{totalItems}</span>
        )}
        <Cart className={styles.headerCartIcon} />
      </Button>

      <ModalCart opened={opened} onClose={close} />
    </>
  );
}
