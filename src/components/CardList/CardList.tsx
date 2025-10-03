import { Grid, Container } from "@mantine/core";
import { Card } from "../Card/Card";
import { useState, useEffect } from "react";
import type { Product } from "../../types/product";
import { Loading } from "../../assets/icons/Loading";
import styles from "./CardList.module.scss";

export function CardList() {
    const [product, setProduct] = useState<Product[]>([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch(
                    "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json"
                );
                if (!response.ok) {
                    throw new Error(`Ошибка HTTP запрос не выполнен: ${response.status}`);
                }
                const productsData = await response.json();

                setProduct(productsData);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Ошибка не изветсна");
            } finally {
                setLoading(false);
            }
        };
        fetchProductData();
    }, []);

    if (loading) {
        return (
            <main className={styles.main}>
                <h1 className={styles.title}>Catalog</h1>
                <Grid>
                    {Array.from({ length: 12 }).map((_, index) => (
                        <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                            <Container>
                                <div className={styles.loadingCard}>
                                    <Loading className={styles.loading} />
                                </div>
                            </Container>
                        </Grid.Col>
                    ))}
                </Grid>
            </main>
        );
    }

    if (error) return <p>Error: {error}</p>;

    if (product.length === 0) return <p>No product data available</p>;

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>Catalog</h1>
            <Grid>
                {product.map((product) => (
                    <Grid.Col key={product.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                        <Card product={product} />
                    </Grid.Col>
                ))}
                ;
            </Grid>
        </main>
    );
}
