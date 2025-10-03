import { Modal, Text } from "@mantine/core";
import { Stepper } from "../Stepper/Stepper";
import { CartEmpty } from "../../assets/icons/CartEmpty";
import styles from "./Modal.module.scss";
import { useCart } from "../../contexts/CartContext";

interface ModalCartProps {
    opened: boolean;
    onClose: () => void;
}

export function ModalCart({ opened, onClose }: ModalCartProps) {
    const { cartItems, updateQuantity, getTotalPrice } = useCart();

    const splitProductName = (productName: string) => {
        const parts = productName.split(" - ");
        return {
            productName: parts[0] || productName,
            productWeight: parts[1] || "",
        };
    };

    const totalPrice = getTotalPrice();

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            size="444px"
            className={styles.modal}
            withCloseButton={false}
            styles={{
                content: {
                    position: "fixed",
                    top: "71px",
                    right: "1.25rem",
                    width: "444px",
                    height: "auto",
                    margin: 0,
                    transform: "none",
                    padding: "1.5rem",
                    borderRadius: "1rem",
                },
                body: {
                    padding: 0,
                },
            }}
        >
            <div className={styles.modalContent}>
                {cartItems.length === 0 ? (
                    <div className={styles.cartEmptyContainer}>
                        <CartEmpty className={styles.cartEmpty} />
                        <Text
                            ta="center"
                            c="dimmed"
                            py="xl"
                            className={styles.cartEmptyText}
                        >
                            You cart is empty!
                        </Text>
                    </div>
                ) : (
                    <>
                        <div className={styles.cartItems}>
                            {cartItems.map((item) => {
                                const { productName, productWeight } = splitProductName(
                                    item.product.name
                                );

                                return (
                                    <div key={item.product.id} className={styles.cartItem}>
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            width={80}
                                            height={80}
                                            className={styles.cartItemImage}
                                        />

                                        <div className={styles.cartItemInfo}>
                                            <Text fw={600} className={styles.cartItemName}>
                                                {productName}
                                            </Text>
                                            <Text
                                                size="sm"
                                                c="dimmed"
                                                className={styles.cartItemWeight}
                                            >
                                                {productWeight}
                                            </Text>
                                            <Text fw={600} className={styles.cartItemPrice}>
                                                き{item.product.price}
                                            </Text>
                                        </div>

                                        <div className={styles.cartItemControls}>
                                            <Stepper
                                                value={item.quantity}
                                                onValueChange={(quantity) =>
                                                    updateQuantity(item.product.id, quantity)
                                                }
                                                className={styles.cartStepper}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className={styles.modalTotal}>
                            <Text fw={700} size="lg" className={styles.modalTotalText}>
                                Total
                            </Text>
                            <Text fw={700} size="lg" className={styles.modalTotalPrice}>
                                ${totalPrice.toFixed(2)}
                            </Text>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    );
}
