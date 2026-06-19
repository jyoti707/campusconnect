import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";

test("Login heading renders", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  expect(
    screen.getByText("Student Login")
  ).toBeInTheDocument();
});