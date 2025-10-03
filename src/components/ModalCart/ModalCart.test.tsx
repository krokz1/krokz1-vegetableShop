import { screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ModalCart } from "./ModalCart";
import type { CartItem } from "../../types/product";
import { renderWithProviders } from "../../test/utils";

const mockUpdateQuantity = vi.fn();
const mockGetTotalPrice = vi.fn();

const mockCartItem: CartItem = {
    product: {
        id: 1,
        name: "Brocolli - 1 Kg",
        price: 120,
        image: "broccoli.jpg",
        category: "vegetables",
    },
    quantity: 2,
};

vi.mock("../../contexts/CartContext", () => ({
    useCart: vi.fn(),
}));

import { useCart } from "../../contexts/CartContext";

vi.mock("../Stepper/Stepper", () => ({
    Stepper: ({
        value,
        onValueChange,
        className,
    }: {
        value: number;
        onValueChange: (value: number) => void;
        className?: string;
    }) => (
        <div data-testid="stepper" className={className}>
            <button onClick={() => onValueChange(value - 1)}>-</button>
            <span data-testid="stepper-value">{value}</span>
            <button onClick={() => onValueChange(value + 1)}>+</button>
        </div>
    ),
}));

vi.mock("../../assets/icons/CartEmpty", () => ({
    CartEmpty: ({ className }: { className?: string }) => (
        <div data-testid="cart-empty-icon" className={className}>
            Cart Empty Icon
        </div>
    ),
}));

vi.mock("./Modal.module.scss", () => ({
    default: {
        modal: "modal",
        modalContent: "modalContent",
        cartItems: "cartItems",
        cartItem: "cartItem",
        cartItemImage: "cartItemImage",
        cartItemInfo: "cartItemInfo",
        cartItemName: "cartItemName",
        cartItemWeight: "cartItemWeight",
        cartItemPrice: "cartItemPrice",
        cartItemControls: "cartItemControls",
        cartStepper: "cartStepper",
        modalTotal: "modalTotal",
        modalTotalText: "modalTotalText",
        modalTotalPrice: "modalTotalPrice",
        cartEmptyContainer: "cartEmptyContainer",
        cartEmpty: "cartEmpty",
        cartEmptyText: "cartEmptyText",
    },
}));

vi.mock("@mantine/core", async () => {
    const actual = await vi.importActual("@mantine/core");
    return {
        ...actual,
        Modal: ({
            opened,
            children,
            className,
        }: {
            opened: boolean;
            onClose: () => void;
            children: React.ReactNode;
            size?: string;
            className?: string;
            withCloseButton?: boolean;
            styles?: any;
        }) => {
            if (!opened) return null;
            return (
                <div data-testid="modal" className={className}>
                    {children}
                </div>
            );
        },
        Text: ({
            children,
            className,
        }: {
            children: React.ReactNode;
            ta?: string;
            c?: string;
            py?: string;
            className?: string;
            fw?: number;
            size?: string;
        }) => <p className={className}>{children}</p>,
    };
});

describe("ModalCart Component", () => {
    const mockOnClose = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        const mockCartContext = {
            cartItems: [mockCartItem],
            updateQuantity: mockUpdateQuantity,
            getTotalPrice: mockGetTotalPrice,
            removeFromCart: vi.fn(),
            addToCart: vi.fn(),
            clearCart: vi.fn(),
            getTotalItems: vi.fn(),
        };

        vi.mocked(useCart).mockReturnValue(mockCartContext);
        mockGetTotalPrice.mockReturnValue(240);
    });

    it("отображает товары корзины когда корзина не пуста", () => {
        renderWithProviders(<ModalCart opened={true} onClose={mockOnClose} />);

        expect(screen.getByText("Brocolli")).toBeInTheDocument();
        expect(screen.getByText("1 Kg")).toBeInTheDocument();
        expect(screen.getByText("き120")).toBeInTheDocument();
    });

    it("отображает состояние пустой корзины когда нет товаров", () => {
        const emptyCartContext = {
            cartItems: [] as CartItem[],
            updateQuantity: mockUpdateQuantity,
            getTotalPrice: mockGetTotalPrice,
            removeFromCart: vi.fn(),
            addToCart: vi.fn(),
            clearCart: vi.fn(),
            getTotalItems: vi.fn(),
        };

        vi.mocked(useCart).mockReturnValue(emptyCartContext);

        renderWithProviders(<ModalCart opened={true} onClose={mockOnClose} />);

        expect(screen.getByText("You cart is empty!")).toBeInTheDocument();
        expect(screen.getByTestId("cart-empty-icon")).toBeInTheDocument();
    });

    it("отображает общую сумму", () => {
        renderWithProviders(<ModalCart opened={true} onClose={mockOnClose} />);

        expect(screen.getByText("Total")).toBeInTheDocument();
        expect(screen.getByText("$240.00")).toBeInTheDocument();
    });
});
