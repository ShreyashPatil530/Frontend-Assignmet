import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const COLORS = ["#3b82f6", "#f59e0b", "#10b981"];

const ProgressChart = ({ tasks }) => {
    const data = [
        { name: "To Do", value: tasks.filter((t) => t.column === "todo").length },
        { name: "In Progress", value: tasks.filter((t) => t.column === "in-progress").length },
        { name: "Done", value: tasks.filter((t) => t.column === "done").length },
    ];

    const total = tasks.length;
    const completionPercent = total ? Math.round((data[2].value / total) * 100) : 0;

    return (
        <div className="progress-chart">
            <h3 style={{ marginBottom: "1rem" }}>Task Progress</h3>

            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "2.5rem", color: "#10b981" }}>{completionPercent}%</h2>
                <p style={{ color: "#94a3b8" }}>Completion Rate</p>
            </div>

            <div style={{ height: "200px" }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div style={{ marginTop: "2rem", height: "200px" }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                        <YAxis stroke="#94a3b8" fontSize={12} />
                        <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)" }} />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ProgressChart;
