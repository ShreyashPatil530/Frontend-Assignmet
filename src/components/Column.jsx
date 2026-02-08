import React from "react";
import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";
import { Plus } from "lucide-react";

const Column = ({ title, tasks, id, onMoveTask, onAddTask, onEditTask }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "TASK",
        drop: (item) => onMoveTask(item.id, id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div ref={drop} className={`column ${isOver ? "column-over" : ""}`}>
            <div className="column-header">
                <div className="column-title">
                    <span>{title}</span>
                    <span className="task-count">{tasks.length}</span>
                </div>
                <button className="btn-ghost" onClick={() => onAddTask(id)}>
                    <Plus size={18} />
                </button>
            </div>
            <div className="task-list">
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} onEdit={onEditTask} />
                ))}
            </div>
        </div>
    );
};

export default Column;
