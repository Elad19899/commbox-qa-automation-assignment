import { test, expect } from "@playwright/test";
import { MessagingPage } from "../page-objects/MessagingPage";
import fs from "fs";
import path from "path";

test.describe("Dummy Messaging App", () => {
  let messagingPage: MessagingPage;

  /**
   * The beforeEach hook runs before every single test in this describe block.
   * It is used to set up the clean state, initialize the Page Object, and configure API mocks.
   */
  test.beforeEach(async ({ page }) => {
    // Initialize the POM for the new page context
    messagingPage = new MessagingPage(page);

    // 1. Mock the HTML file delivery
    // We intercept requests to our fake localhost URL and serve the local HTML file content directly.
    // This allows us to load the UI locally over an HTTP protocol bypassing tight browser CORS limits.
    await page.route(
      "http://localhost:8080/dummy-messaging-app.html",
      async (route) => {
        const html = fs.readFileSync(
          path.resolve(process.cwd(), "dummy-messaging-app.html"),
          "utf8",
        );
        await route.fulfill({
          status: 200,
          contentType: "text/html",
          body: html,
        });
      },
    );

    // 2. Mock the backend API response
    // The HTML app attempts to make a POST request to /api/send-message.
    // Since we have no real server, we intercept that fetch call and simulate a successful response.
    await page.route("**/api/send-message", async (route) => {
      const request = route.request();
      const postData = JSON.parse(request.postData() || "{}");

      // Add a small 500ms delay to simulate real-world network latency for realism
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Respond with a 200 OK and expected JSON structure matching the frontend app's logic
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          message: postData.message || "Empty",
        }),
      });
    });

    // Finally, navigate to the app UI. Must be done after routes are established.
    await messagingPage.navigate();
  });

  /**
   * The afterEach hook runs after every single test in this describe block.
   * It ensures the browser page is explicitly closed cleanly after each test runs.
   */
  test.afterEach(async ({ page }) => {
    await page.close();
  });

  /**
   * Standard happy path test.
   * Verifies that after entering text and clicking send, the message appears in the chat list.
   */
  test("should send a message and display it in the list", async ({ page }) => {
    const testMessage = "Random Text!";

    // Verify initial state: Ensure the list is initially empty before we do anything
    let messages = await messagingPage.getMessages();
    expect(messages.length).toBe(0);

    // Perform User Action: Type and send a message using the POM methods
    await messagingPage.sendMessage(testMessage);

    // Wait for resolution: Wait for the newly created message element to appear in the DOM
    // This implicitly waits for the mocked network response delay (500ms) to finish.
    await expect(messagingPage.messageList.locator("li")).toHaveCount(1);

    // Verify final state: Extract the text from the list and ensure it matches our input
    messages = await messagingPage.getMessages();
    expect(messages[0]).toBe(testMessage);

    // Verify side effect: Ensure the text input field was automatically cleared after successful send
    await expect(messagingPage.messageInput).toHaveValue("");
  });

  /**
   * Edge case test.
   * Verifies that when clicking the "Send" button without typing anything,
   * the app gracefully ignores the input rather than posting empty blanks.
   */
  test("should ignore empty messages", async ({ page }) => {
    // Attempt to send an empty string
    await messagingPage.sendMessage("");

    // Verify that the message list remains completely empty (no new items rendered)
    await expect(messagingPage.messageList.locator("li")).toHaveCount(0);
  });
});
