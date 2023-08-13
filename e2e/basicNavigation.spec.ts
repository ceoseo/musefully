import { expect, test } from '@playwright/test';

test('should navigate to the art search page', async ({
  page,
  browserName,
  isMobile,
}) => {
  await page.goto('/');
  if (isMobile) {
    await page.click('[aria-label="Open Menu"]');
    await page.getByRole('button', { name: 'Search' }).click();
  } else {
    await page.click('text=Search');
  }
  await expect(page).toHaveURL('/art?hasPhoto=true');
});
