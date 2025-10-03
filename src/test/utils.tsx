import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";

const TestProviders = ({ children }: { children: React.ReactNode }) => {
    return <MantineProvider>{children}</MantineProvider>;
};

export const renderWithProviders = (ui: ReactElement) => {
    return render(ui, { wrapper: TestProviders });
};

export const createMockProduct = (overrides = {}) => ({
    id: 1,
    name: "Test Product - 1 Kg",
    price: 100,
    image: "test.jpg",
    category: "vegetables",
    ...overrides,
});
