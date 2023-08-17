const puppeteer = require("puppeteer-core");
// const { scrollPageToBottom } = require("puppeteer-autoscroll-down");
// const { scrollPageToTop } = require("puppeteer-autoscroll-down");
const assert = require("assert");
const os = require("os");
//const fs = require("fs");
const path = require("path");
const hidemyacc = new (require("./hidemyacc"))();
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const goto = async (
  page,
  url,
  options = { timeout: 60000, waitUntil: "networkidle0" }
) => {
  try {
    await page.goto(url, options);
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

const waitForSelector = async (page, selector, options = { timeout: 3000 }) => {
  try {
    await page.waitForSelector(selector, options);
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const hidemyaccCachePath = path.join(
  os.homedir(),
  ".hidemyacc",
  "cached-profiles"
);

!(async () => {
  try {
    const proxy = {
      mode: "none",
      host: "pr.lunaproxy.com",
      port: 12233,
      username: "user-lu2769084-region-us",
      password: "Abcd!22345",
    };

    let i = 0;
    // while (i < 100) {
    //   try {
    //     // Tạo 1 profile mới
    //     i++;
    //     const createProfile = await hidemyacc.create({
    //       name: `Test ` + i,
    //       folder: "64b64fa2f25829e1fdd1e142",
    //     });
    //     //console.log(createProfile.data);
    //     //console.log(1);
    //     console.log(createProfile.data.name);
    //     const profileID = createProfile.data.id; //Lấy profile ID vừa tạo
    //     console.log(profileID);

    //     //Start profile
    //     const startProfile = await hidemyacc.start(profileID, {
    //       proxy: JSON.stringify(proxy),
    //     });

    //     const browser = await puppeteer.connect({
    //       browserWSEndpoint: startProfile.data.wsUrl,
    //       defaultViewport: null,
    //       slowMo: 60,
    //     });

    //     const page = await browser.newPage();
    //     assert(await goto(page, "about:blank", { waitUntil: "load" }));

    //     assert(browser);
    //     await delay(6000);
    //     browser.close();

    //     const deleteProfile = await hidemyacc.delete(profileID);
    //     await deleteProfile;
    //     console.log("Delete done " + i);
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // }
    // for (i = 0; i < 100; i++)

    while (i < 400) {
      i++;
      let createProfile = await hidemyacc.create({
        name: `Test ` + i,
        folder: "64da0f7e8c5946f7646d60ce",
      });
      //console.log(createProfile);
      //console.log(createProfile.data);
      //console.log(1);
      await delay(1000);
      if (createProfile === null || createProfile.data === null) {
        console.log(createProfile);
        createProfile = await hidemyacc.create({
          name: `Test ` + i,
          folder: "64da0f7e8c5946f7646d60ce",
        });
      }
      console.log(createProfile.data.name);
      const profileID = createProfile.data.id; //Lấy profile ID vừa tạo
      console.log(profileID);
    }
  } catch (error) {
    console.log(error.message);
  }
})();
