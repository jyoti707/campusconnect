import { render, screen } from "@testing-library/react";
import Register from "../pages/Register";

test("Register form renders", () => {
  render(<Register />);

  expect(
    screen.getByText("Create Account")
  ).toBeInTheDocument();
});