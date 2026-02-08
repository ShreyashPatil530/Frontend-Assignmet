import { useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "https://backend-assignmet.onrender.com";

const useSocket = () => {
    const [socket, setSocket] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const newSocket = io(SOCKET_URL);
        setSocket(newSocket);

        newSocket.on("connect", () => {
            setIsConnected(true);
            console.log("Connected to WebSocket");
        });

        newSocket.on("disconnect", () => {
            setIsConnected(false);
            console.log("Disconnected from WebSocket");
        });

        newSocket.on("sync:tasks", (initialTasks) => {
            setTasks(initialTasks);
        });

        newSocket.on("task:create", (task) => {
            setTasks((prev) => [...prev, task]);
        });

        newSocket.on("task:update", (updatedTask) => {
            setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? { ...t, ...updatedTask } : t)));
        });

        newSocket.on("task:move", ({ id, column }) => {
            setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, column } : t)));
        });

        newSocket.on("task:delete", (id) => {
            setTasks((prev) => prev.filter((t) => t.id !== id));
        });

        return () => newSocket.close();
    }, []);

    const createTask = useCallback((task) => {
        socket?.emit("task:create", task);
    }, [socket]);

    const updateTask = useCallback((task) => {
        socket?.emit("task:update", task);
    }, [socket]);

    const moveTask = useCallback((id, column) => {
        socket?.emit("task:move", { id, column });
    }, [socket]);

    const deleteTask = useCallback((id) => {
        socket?.emit("task:delete", id);
    }, [socket]);

    return {
        tasks,
        isConnected,
        createTask,
        updateTask,
        moveTask,
        deleteTask,
    };
};

export default useSocket;
