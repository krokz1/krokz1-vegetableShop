import { screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { CardList } from "./CardList";
import type { Product } from "../../types/product";
import { renderWithProviders } from "../../test/utils";

const mockProducts: Product[] = [
    {
        id: 1,
        name: "Brocolli - 1 Kg",
        price: 120,
        image: "broccoli.jpg",
        category: "vegetables",
    },
    {
        id: 2,
        name: "Cauliflower - 1 Kg",
        price: 80,
        image: "cauliflower.jpg",
        category: "vegetables",
    },
];

vi.mock("../Card/Card", () => ({
    Card: ({ product }: { product: Product }) => (
        <div data-testid="product-card">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
        </div>
    ),
}));

vi.mock("./CardList.module.scss", () => ({
    default: {
        main: "main",
        title: "title",
        loadingCard: "loadingCard",
        loading: "loading",
    },
}));

vi.mock("../../assets/icons/Loading", () => ({
    Loading: ({ className }: { className?: string }) => (
        <div data-testid="loading-icon" className={className}>
            Loading...
        </div>
    ),
}));

describe("CardList Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        global.fetch = vi.fn();
    });

    it("отображает состояние загрузки первоначально", () => {
        vi.mocked(global.fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => mockProducts,
        } as Response);

        const { container } = renderWithProviders(<CardList />);

        expect(screen.getByText("Catalog")).toBeInTheDocument();
        expect(container.querySelector(".mantine-Grid-root")).toBeInTheDocument();
    });

    it("отображает продукты после успешного API вызова", async () => {
        vi.mocked(global.fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => mockProducts,
        } as Response);

        renderWithProviders(<CardList />);

        await waitFor(
            () => {
                expect(screen.getByText("Brocolli - 1 Kg")).toBeInTheDocument();
            },
            { timeout: 3000 }
        );

        expect(screen.getByText("Cauliflower - 1 Kg")).toBeInTheDocument();
    });

    it("отображает сообщение об ошибке когда API вызов неудачен", async () => {
        vi.mocked(global.fetch).mockRejectedValueOnce(new Error("Network error"));

        renderWithProviders(<CardList />);

        await waitFor(
            () => {
                expect(screen.getByText(/Error: Network error/)).toBeInTheDocument();
            },
            { timeout: 3000 }
        );
    });
});
