import React, { useState } from "react";
import Column from "./Column";
import TaskModal from "./TaskModal";
import useSocket from "../hooks/useSocket";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ProgressChart from "./ProgressChart";

const KanbanBoard = () => {
    const { tasks, isConnected, createTask, updateTask, moveTask, deleteTask } = useSocket();
    const [modalState, setModalState] = useState({ isOpen: false, task: null, columnId: "todo" });

    const columns = [
        { id: "todo", title: "To Do" },
        { id: "in-progress", title: "In Progress" },
        { id: "done", title: "Done" },
    ];

    const handleAddTask = (columnId) => {
        setModalState({ isOpen: true, task: null, columnId });
    };

    const handleEditTask = (task) => {
        setModalState({ isOpen: true, task, columnId: task.column });
    };

    const handleSaveTask = (taskData) => {
        if (taskData.id) {
            updateTask(taskData);
        } else {
            createTask(taskData);
        }
    };

    if (!isConnected) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <p>Connecting to server...</p>
            </div>
        );
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="kanban-container">
                <aside className="sidebar">
                    <ProgressChart tasks={tasks} />
                </aside>

                <main className="kanban-board">
                    {columns.map((col) => (
                        <Column
                            key={col.id}
                            id={col.id}
                            title={col.title}
                            tasks={tasks.filter((t) => t.column === col.id)}
                            onMoveTask={moveTask}
                            onAddTask={handleAddTask}
                            onEditTask={handleEditTask}
                        />
                    ))}
                </main>
            </div>

            <TaskModal
                isOpen={modalState.isOpen}
                task={modalState.task}
                columnId={modalState.columnId}
                onClose={() => setModalState({ ...modalState, isOpen: false })}
                onSave={handleSaveTask}
                onDelete={deleteTask}
            />
        </DndProvider>
    );
};

export default KanbanBoard;
