import { Page, Locator } from "@playwright/test";

/**
 * Page Object Model (POM) for the Messaging App.
 * This class encapsulates all the UI locators and actions for the messaging interface,
 * making the actual test files cleaner, more readable, and easier to maintain.
 */
export class MessagingPage {
  // Define locators as readonly properties to prevent accidental reassignment
  readonly page: Page;
  readonly messageInput: Locator;
  readonly sendBtn: Locator;
  readonly messageList: Locator;

  /**
   * Initializes the locators using the provided Playwright Page instance.
   * @param page The Playwright Page object provided by the test runner
   */
  constructor(page: Page) {
    this.page = page;
    this.messageInput = page.locator("#messageInput");   // Input field for typing messages
    this.sendBtn = page.locator("#sendBtn");             // Button to trigger the send action
    this.messageList = page.locator("#messageList");     // The unordered list containing message items
  }

  /**
   * Navigates to the messaging application.
   * We use a mock localhost URL (http://localhost:8080) instead of a file:// protocol.
   * This avoids CORS and fetch API restrictions that browsers enforce on local files.
   */
  async navigate() {
    await this.page.goto('http://localhost:8080/dummy-messaging-app.html');
  }

  /**
   * Fills the message input field with the provided text.
   */
  async typeMessage(message: string) {
    await this.messageInput.fill(message);
  }

  /**
   * Clicks the send button.
   */
  async clickSend() {
    await this.sendBtn.click();
  }

  /**
   * Convenience method to type a message and send it in one go.
   */
  async sendMessage(message: string) {
    await this.typeMessage(message);
    await this.clickSend();
  }

  /**
   * Retrieves an array of all text contents from the message list.
   * @returns Array of strings representing the sent messages
   */
  async getMessages() {
    return this.messageList.locator("li").allTextContents();
  }
}
