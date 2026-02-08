import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useSocket from "../../hooks/useSocket";
import { io } from "socket.io-client";

// Mock socket.io-client
vi.mock("socket.io-client", () => {
    const mSocket = {
        on: vi.fn(),
        emit: vi.fn(),
        close: vi.fn(),
    };
    return { io: vi.fn(() => mSocket) };
});

describe("useSocket hook", () => {
    let mockSocket;

    beforeEach(() => {
        vi.clearAllMocks();
        mockSocket = io();
    });

    it("should initialize with empty tasks", () => {
        const { result } = renderHook(() => useSocket());
        expect(result.current.tasks).toEqual([]);
    });

    it("should handle task:create event", () => {
        const { result } = renderHook(() => useSocket());

        // Find the 'task:create' callback
        const onCall = mockSocket.on.mock.calls.find(call => call[0] === "task:create");
        const callback = onCall[1];

        act(() => {
            callback({ id: "1", title: "New Task", column: "todo" });
        });

        expect(result.current.tasks).toHaveLength(1);
        expect(result.current.tasks[0].title).toBe("New Task");
    });

    it("should handle task:update event", () => {
        const { result } = renderHook(() => useSocket());

        // Setup initial task
        const createCall = mockSocket.on.mock.calls.find(call => call[0] === "task:create")[1];
        act(() => {
            createCall({ id: "1", title: "Initial Task", column: "todo" });
        });

        // Handle update
        const updateCall = mockSocket.on.mock.calls.find(call => call[0] === "task:update")[1];
        act(() => {
            updateCall({ id: "1", title: "Updated Task", column: "todo" });
        });

        expect(result.current.tasks[0].title).toBe("Updated Task");
    });

    it("should emit task:create when createTask is called", () => {
        const { result } = renderHook(() => useSocket());
        const newTask = { title: "Test Task", column: "todo" };

        act(() => {
            result.current.createTask(newTask);
        });

        expect(mockSocket.emit).toHaveBeenCalledWith("task:create", newTask);
    });
});
