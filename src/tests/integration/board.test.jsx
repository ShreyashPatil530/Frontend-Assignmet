import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import KanbanBoard from "../../components/KanbanBoard";
import { useSocket } from "../../hooks/useSocket";

// Mock useSocket
vi.mock("../../hooks/useSocket", () => ({
    __esModule: true,
    default: vi.fn(() => ({
        tasks: [
            { id: "1", title: "Task 1", description: "Desc 1", priority: "Medium", category: "Feature", column: "todo" }
        ],
        isConnected: true,
        createTask: vi.fn(),
        updateTask: vi.fn(),
        moveTask: vi.fn(),
        deleteTask: vi.fn(),
    }))
}));

describe("KanbanBoard Integration", () => {
    it("renders columns and tasks", () => {
        render(<KanbanBoard />);
        expect(screen.getByText("To Do")).toBeDefined();
        expect(screen.getByText("Task 1")).toBeDefined();
        expect(screen.getByText("Medium")).toBeDefined();
    });

    it("opens modal when clicking add button", () => {
        render(<KanbanBoard />);
        const addButtons = screen.getAllByRole("button");
        // Find the plus button - it's a btn-ghost in Column
        fireEvent.click(addButtons[0]);
        expect(screen.getByText("Create New Task")).toBeDefined();
    });
});
