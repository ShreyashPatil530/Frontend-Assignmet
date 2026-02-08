import "@testing-library/jest-dom";
import { vi } from "vitest";
import React from "react";

vi.mock("recharts", async (importOriginal) => {
    const original = await importOriginal();
    return {
        ...original,
        ResponsiveContainer: ({ children }) =>
            React.createElement("div", {
                className: "recharts-responsive-container",
                style: { width: "100%", height: "100%" }
            }, children),
    };
});

