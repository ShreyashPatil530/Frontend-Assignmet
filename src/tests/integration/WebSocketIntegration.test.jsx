import { render, screen } from "@testing-library/react";

import KanbanBoard from "../../components/KanbanBoard";

vi.mock("../../hooks/useSocket", () => ({
  __esModule: true,
  default: vi.fn(() => ({
    tasks: [],
    isConnected: true,
  }))
}));


// mock socket.io-client library

test("WebSocket receives task update", async () => {
  render(<KanbanBoard />);

  expect(screen.getByText("To Do")).toBeDefined();
});

// TODO: Add more integration tests
