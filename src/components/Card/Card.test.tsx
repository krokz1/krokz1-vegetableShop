import { screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Card } from "./Card";
import type { Product } from "../../types/product";
import { renderWithProviders } from "../../test/utils";

const mockProduct: Product = {
  id: 1,
  name: "Brocolli - 1 Kg",
  price: 120,
  image: "https://example.com/broccoli.jpg",
  category: "vegetables",
};

vi.mock("../CardButton/CardButton", () => ({
  CardButton: ({
    product,
    quantity,
  }: {
    product: Product;
    quantity: number;
  }) => (
    <button data-testid="card-button">
      Add to cart - {product.name} (Qty: {quantity})
    </button>
  ),
}));

vi.mock("../Stepper/Stepper", () => ({
  Stepper: ({
    value,
    className,
  }: {
    value: number;
    onValueChange: (value: number) => void;
    className?: string;
  }) => (
    <div data-testid="stepper" className={className}>
      <span>Quantity: {value}</span>
    </div>
  ),
}));

vi.mock("./Card.module.scss", () => ({
  default: {
    card: "card",
    productInfoContainer: "productInfoContainer",
    name: "name",
    spanName: "spanName",
    weight: "weight",
    productPriceContainer: "productPriceContainer",
    price: "price",
    cardStepper: "cardStepper",
  },
}));

describe("Card Component", () => {
  it("корректно отображает информацию о продукте", () => {
    renderWithProviders(<Card product={mockProduct} />);

    expect(screen.getByText("Brocolli")).toBeInTheDocument();
    expect(screen.getByText("1 Kg")).toBeInTheDocument();
    expect(screen.getByText("$120")).toBeInTheDocument();

    const image = screen.getByAltText(mockProduct.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockProduct.image);
  });

  it("отображает компонент Stepper с начальным количеством", () => {
    renderWithProviders(<Card product={mockProduct} />);

    expect(screen.getByText("Quantity: 1")).toBeInTheDocument();
  });

  it("правильно разделяет название продукта когда нет дефиса", () => {
    const productWithoutDash: Product = {
      ...mockProduct,
      name: "Carrot",
    };

    renderWithProviders(<Card product={productWithoutDash} />);

    expect(screen.getByText("Carrot")).toBeInTheDocument();
  });
});
