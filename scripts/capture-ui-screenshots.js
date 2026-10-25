const { chromium } = require("playwright");
const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:8000";
const DEMO_USERNAME = process.env.DEMO_USERNAME;
const DEMO_PASSWORD = process.env.DEMO_PASSWORD;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!DEMO_USERNAME || !DEMO_PASSWORD || !ADMIN_PASSWORD) {
  throw new Error("Screenshot capture requires temporary CI demo-user credentials in environment variables.");
}

async function main() {
  const browser = await chromium.launch({
    headless: false,
    args: [
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--start-maximized",
      "--window-size=1600,1100",
      "--no-first-run",
      "--no-default-browser-check"
    ]
  });

  const context = await browser.newContext({
    viewport: { width: 1540, height: 900 },
    deviceScaleFactor: 1
  });

  async function desktopShot(page, filename) {
    await page.bringToFront();
    await page.waitForTimeout(1200);
    const filePath = path.resolve(process.cwd(), filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    execFileSync("scrot", [filePath]);
    const stat = fs.statSync(filePath);
    if (stat.size < 10000) throw new Error("Desktop screenshot is unexpectedly small: " + filename);
    console.log("Captured genuine desktop browser screenshot: " + filename + " (" + stat.size + " bytes)");
  }

  const page = await context.newPage();

  // Task 17: dealership cards before login.
  await page.goto(BASE_URL + "/", { waitUntil: "domcontentloaded" });
  await page.locator(".dealer-card").first().waitFor({ timeout: 30000 });
  await desktopShot(page, "get_dealers.png");

  // Log in through the rendered React form.
  await page.goto(BASE_URL + "/login", { waitUntil: "domcontentloaded" });
  await page.locator('input[autocomplete="username"]').fill(DEMO_USERNAME);
  await page.locator('input[autocomplete="current-password"]').fill(DEMO_PASSWORD);
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForURL((url) => url.origin === new URL(BASE_URL).origin && (url.pathname === "/" || url.pathname === ""), { timeout: 20000 });
  await page.locator(".dealer-card").first().waitFor({ timeout: 20000 });

  // Task 18: logged-in landing page with the username and Review Dealer action visible.
  await page.locator(".site-header").getByText(DEMO_USERNAME, { exact: true }).waitFor();
  await page.locator(".dealer-card").getByRole("link", { name: "Review Dealer" }).first().waitFor();
  await desktopShot(page, "get_dealers_loggedin.png");

  // Task 19: state-filtered home page with the real browser address bar visible.
  await page.locator("select").selectOption({ label: "Kansas" });
  await page.locator(".dealer-card").filter({ hasText: "Kansas" }).first().waitFor({ timeout: 20000 });
  await desktopShot(page, "dealersbystate.png");

  // Task 20: a dealer with seeded reviews (dealer 2).
  await page.goto(BASE_URL + "/dealer/2", { waitUntil: "domcontentloaded" });
  await page.locator(".review").first().waitFor({ timeout: 20000 });
  await desktopShot(page, "dealer_id_reviews.png");

  // Task 21: completed review form before submitting.
  const reviewText = "CI screenshot review: Fantastic service and helpful staff.";
  await page.goto(BASE_URL + "/postreview/2", { waitUntil: "domcontentloaded" });
  await page.locator('textarea[name="review"]').fill(reviewText);
  await page.locator('input[name="car_make"]').fill("Toyota");
  await page.locator('input[name="car_model"]').fill("Camry");
  await page.locator('input[name="car_year"]').fill("2024");
  await page.locator('input[name="purchase_date"]').fill("2026-10-24");
  await page.locator('input[name="purchase"]').check();
  await desktopShot(page, "dealership_review_submission.png");

  // Task 22: submit the same review and capture the actual saved review.
  await page.getByRole("button", { name: "Post Review" }).click();
  await page.waitForURL((url) => url.pathname === "/dealer/2", { timeout: 20000 });
  const newReview = page.locator(".review").filter({ hasText: reviewText });
  await newReview.waitFor({ timeout: 20000 });
  await newReview.scrollIntoViewIfNeeded();
  // Keep the browser address bar visible for assessment evidence and make the posted review readable.
  await desktopShot(page, "added_review.png");

  // Tasks 12-13: authenticate as a temporary Django superuser named root, then log out.
  const admin = await context.newPage();
  await admin.goto(BASE_URL + "/admin/", { waitUntil: "domcontentloaded" });
  await admin.locator("#id_username").fill("root");
  await admin.locator("#id_password").fill(ADMIN_PASSWORD);
  await admin.locator('input[type="submit"]').click();
  await admin.locator("#content-main").waitFor({ timeout: 20000 });
  await admin.getByRole("button", { name: /Log out/i }).waitFor();
  await desktopShot(admin, "admin_login.png");

  await admin.getByRole("button", { name: /Log out/i }).click();
  await admin.waitForTimeout(700);
  // Prefer the logout confirmation page if Django renders it. If it redirects, capture the logged-out login page.
  if (!(await admin.locator("#content").count())) {
    await admin.goto(BASE_URL + "/admin/login/", { waitUntil: "domcontentloaded" });
  }
  await admin.locator("#content").waitFor({ timeout: 20000 });
  await desktopShot(admin, "admin_logout.png");

  await browser.close();
  console.log("Completed local-runtime UI screenshots. These are not screenshots of an IBM-hosted deployment.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
