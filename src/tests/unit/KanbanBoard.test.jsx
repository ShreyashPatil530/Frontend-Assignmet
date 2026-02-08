import { render, screen } from "@testing-library/react";
import KanbanBoard from "../../components/KanbanBoard";

vi.mock("../../hooks/useSocket", () => ({
  __esModule: true,
  default: vi.fn(() => ({
    tasks: [],
    isConnected: true,
  }))
}));


test("renders Kanban board title", () => {
  render(<KanbanBoard />);
  expect(screen.getByText("To Do")).toBeDefined();
});

// TODO: Add more unit tests for individual components
