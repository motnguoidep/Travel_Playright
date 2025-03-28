import { test, expect } from '@playwright/test';

test.describe('Handle multiple tab', () => {
  test('Click card to open popup and perform action', async ({ page }) => {
    // Mở trang chính
    await page.goto('https://www.phptravels.net/tour/464257P42/viator/31-03-2025/1/0');

    // Lấy phần tử cần click (theo locator)
    const cardFadeOut = page.locator('.card-body > .fadeout').first();

    // Đợi phần tử xuất hiện và visible trong 30 giây
    await cardFadeOut.waitFor({ state: 'visible', timeout: 30000 });
    
    // Scroll phần tử vào view nếu cần
    await cardFadeOut.scrollIntoViewIfNeeded();

    // Click vào phần tử (force nếu cần thiết)
    await cardFadeOut.click({ force: true });

    // Đợi sự kiện popup (mở tab mới) xuất hiện trong 30 giây
    const popup = await page.waitForEvent('popup', { timeout: 30000 });
    
    // Chờ cho popup tải xong (DOM content loaded)
    await popup.waitForLoadState('domcontentloaded');

    // Thực hiện thao tác trên popup nếu cần
    // Ví dụ: await popup.locator('selector').click();

    // (Tùy chọn) In ra URL của popup để kiểm tra
    console.log('Popup URL:', popup.url());
  });
});
