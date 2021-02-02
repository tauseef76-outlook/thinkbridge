let XL = require("./Reader.js");

describe("signIn Test", () => {
  let nameField = "";
  let OrgName = "";
  let Email = "";
  let checkbox = "";
  let button = "";

  it("identify elements", () => {
    browser.get("http://jt-dev.azurewebsites.net/#/SignUp");
    browser.driver.ignoreSynchronization = true;
    browser.waitForAngularEnabled();    //waiting for the browser to load
    browser.driver.manage().window().maximize();

    //locating elements
    nameField = browser.findElement(by.name("name"));
    OrgName = browser.findElement(by.name("orgName"));
    Email = browser.findElement(by.name("email"));
    checkbox = browser.findElement(
      by.xpath("//input[@type='checkbox']//following-sibling::span")
    );
    button = browser.findElement(by.xpath("//button[@type='submit']"));
  });

  it("Test for language: English & Dutch", () => {
    var EC = protractor.ExpectedConditions;
    var ar = element(
      by.xpath("//div[@id='language']//i[@class='caret pull-right']")
    );
    browser.wait(EC.visibilityOf(ar));
    ar.click();
    var langEng = element(by.xpath("(//li[@id='ui-select-choices-1'])"));
    expect(langEng.getText()).toContain("English");
    expect(langEng.getText()).toContain("Dutch");
    element(
      by.xpath(
        "//li[@id='ui-select-choices-1']//div[contains(text(),'English')]"
      )
    ).click();
  });

    //Reading login info from TestData.xlsx
  let TEST_DATA = XL.read_from_excel("Sheet1", "./TestData.xlsx");

  TEST_DATA.forEach((data) => {
    it("Test to check login", () => {
      
      nameField.clear();
      OrgName.clear();
      Email.clear();

      nameField.sendKeys(data.Name);
      OrgName.sendKeys(data.OrgName);
      Email.sendKeys(data.Email);
      checkbox.click();
      browser.driver.sleep(1000);
      expect(button.isEnabled()).toBe(true);
      browser.driver.sleep(2000);
      checkbox.click();
    });
  });
});
