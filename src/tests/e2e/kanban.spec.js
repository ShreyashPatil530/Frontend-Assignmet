import { test, expect } from "@playwright/test";

test.describe("Kanban Board E2E", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:5173");
    });

    test("should create a new task", async ({ page }) => {
        // Click plus button in To Do column
        await page.locator(".column-header .btn-ghost").first().click();

        // Fill form
        await page.fill('input[placeholder="What needs to be done?"]', "E2E Task");
        await page.fill('textarea[placeholder="Add some details..."]', "Details for E2E task");

        // Select priority (since we use react-select, we might need to be more specific)
        // For simplicity in testing, we can check if the modal is open and has the content
        await expect(page.locator("text=Create New Task")).toBeVisible();

        // Save
        await page.click("text=Save Task");

        // Check if task appears
        await expect(page.locator("text=E2E Task")).toBeVisible();
    });

    test("should display progress chart", async ({ page }) => {
        await expect(page.locator("text=Task Progress")).toBeVisible();
        await expect(page.locator(".recharts-responsive-container")).toBeVisible();
    });
});
