import { render, screen } from "@testing-library/react";
import Header from "./features/layout/Header";

test("renders the App title", () => {
  render(<Header />);
  const titleElement = screen.getByText(/Dart Cart/i);
  expect(titleElement).toBeInTheDocument();
});
