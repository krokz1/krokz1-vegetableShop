import { Logo } from "../../assets/icons/Logo";
import { HeaderCartButton } from "../HeaderCartButton/HeaderCartButton";
import styles from "./Header.module.scss";

export function Header() {
    return (
        <>
            <header className={styles.header}>
                <Logo className={styles.headerLogo} />
                <HeaderCartButton />
            </header>
        </>
    );
}
