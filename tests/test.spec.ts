import { test, expect } from '../fixtures';

test.beforeEach(async ({ page, extensionId }) => {
  await page.goto(`chrome-extension://${extensionId}/test-page.html`);
});

test('test page', async ({ page, extensionId }) => {
  await expect(page.locator('h1')).toHaveText('test page');
});

test('input select', async ({ page, extensionId }) => {
    const inputElement = await page.locator('input');
    await inputElement.fill('Hello, Playwright!');

    await inputElement.press('Home'); // カーソルを最初に移動
    await inputElement.press('Shift+End'); // カーソルを最後に持っていき、テキスト全体を選択

    const selectedText = await inputElement.evaluate(el => {
      const selection = window.getSelection();
      return selection?.toString();
    });

    expect(selectedText).toBe('Hello, Playwright!');
});