import React from "react";
import { useDrag } from "react-dnd";
import { Paperclip, MessageSquare, MoreHorizontal } from "lucide-react";

const TaskCard = ({ task, onEdit }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "TASK",
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const priorityClass = `priority-${task.priority.toLowerCase()}`;

    return (
        <div
            ref={drag}
            className="task-card"
            style={{ opacity: isDragging ? 0.5 : 1 }}
            onClick={() => onEdit(task)}
        >
            <div className="task-header">
                <span className={`task-priority ${priorityClass}`}>{task.priority}</span>
                <span className="task-category">{task.category}</span>
            </div>
            <h3 className="task-title">{task.title}</h3>
            <p className="task-desc">{task.description}</p>

            <div className="task-footer">
                <div style={{ display: "flex", gap: "0.75rem" }}>
                    {task.attachments?.length > 0 && (
                        <span style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                            <Paperclip size={14} /> {task.attachments.length}
                        </span>
                    )}
                    <span style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                        <MessageSquare size={14} /> 2
                    </span>
                </div>
                <MoreHorizontal size={14} />
            </div>
        </div>
    );
};

export default TaskCard;
