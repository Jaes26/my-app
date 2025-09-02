jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => <div>{element}</div>,
  useNavigate: () => jest.fn(),
}));

import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the reservation page heading", () => {
  render(<App />);
  const headingElement = screen.getByText(/welcome to our reservation page/i);
  expect(headingElement).toBeInTheDocument();
});

test("renders the form labels", () => {
  render(<App />);
  expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
});
