import React, { useState, useEffect } from "react";
import Select from "react-select";
import { X, Upload } from "lucide-react";

const priorityOptions = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
];

const categoryOptions = [
    { value: "Bug", label: "Bug" },
    { value: "Feature", label: "Feature" },
    { value: "Enhancement", label: "Enhancement" },
];

const customSelectStyles = {
    control: (base) => ({
        ...base,
        background: "rgba(255, 255, 255, 0.05)",
        borderColor: "rgba(255, 255, 255, 0.1)",
        color: "#fff",
    }),
    menu: (base) => ({
        ...base,
        background: "#1e293b",
    }),
    option: (base, state) => ({
        ...base,
        background: state.isFocused ? "#3b82f6" : "transparent",
        color: "#fff",
    }),
    singleValue: (base) => ({
        ...base,
        color: "#fff",
    }),
};

const TaskModal = ({ isOpen, onClose, onSave, task, columnId, onDelete }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "Medium",
        category: "Feature",
        attachments: [],
    });

    useEffect(() => {
        if (task) {
            setFormData(task);
        } else {
            setFormData({
                title: "",
                description: "",
                priority: "Medium",
                category: "Feature",
                attachments: [],
                column: columnId,
            });
        }
    }, [task, columnId, isOpen]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newAttachments = files.map(file => URL.createObjectURL(file));
        setFormData(prev => ({
            ...prev,
            attachments: [...prev.attachments, ...newAttachments]
        }));
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="btn-ghost" style={{ position: "absolute", right: "1rem", top: "1rem" }} onClick={onClose}>
                    <X size={20} />
                </button>
                <h2 style={{ marginBottom: "1.5rem" }}>{task ? "Edit Task" : "Create New Task"}</h2>

                <div className="form-group">
                    <label className="form-label">Title</label>
                    <input
                        className="form-input"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="What needs to be done?"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-input"
                        rows="3"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Add some details..."
                    />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="form-group">
                        <label className="form-label">Priority</label>
                        <Select
                            options={priorityOptions}
                            styles={customSelectStyles}
                            value={priorityOptions.find(o => o.value === formData.priority)}
                            onChange={(opt) => setFormData({ ...formData, priority: opt.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Category</label>
                        <Select
                            options={categoryOptions}
                            styles={customSelectStyles}
                            value={categoryOptions.find(o => o.value === formData.category)}
                            onChange={(opt) => setFormData({ ...formData, category: opt.value })}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Attachments</label>
                    <label className="form-input" style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                        <Upload size={18} />
                        <span>Upload files</span>
                        <input type="file" multiple style={{ display: "none" }} onChange={handleFileChange} />
                    </label>
                    <div className="file-preview">
                        {formData.attachments?.map((src, i) => (
                            <img key={i} src={src} className="preview-item" alt="preview" />
                        ))}
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
                    {task && (
                        <button className="btn" style={{ background: "#ef4444", color: "white" }} onClick={() => { onDelete(task.id); onClose(); }}>
                            Delete
                        </button>
                    )}
                    <div style={{ display: "flex", gap: "1rem", marginLeft: "auto" }}>
                        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
                        <button className="btn btn-primary" onClick={handleSave}>Save Task</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
