const express = require("express");
const expect = require("chai").expect;
const path = require("path");
const Nightmare = require("nightmare");

const app = express();

app.use(express.static(path.join(__dirname, "../../public")));
app.use(express.static(path.join(__dirname, "../../dist")));

const url = "http://localhost:8888";

const nightmare = new Nightmare();

describe("End to End Tests", () => {
  let httpServer = null;
  let pageObject = null;

  before(done => {
    httpServer = app.listen(8888);
    done();
  });

  beforeEach(() => {
    pageObject = nightmare.goto(url);
  });

  after(done => {
    httpServer.close();
    done();
  });

  it("should contain a <h1> element for the page title", () => {
    return pageObject
      .evaluate(() => document.querySelector("h1").innerText)
      .then(headerText => {
        expect(headerText).to.not.be.null;
        expect(headerText).to.equal("Mortgage Calculator");
      });
  });

  it("should contain a <button> element for calculating", () => {
    return pageObject
      .evaluate(() => document.querySelector("button").innerText)
      .then(headerText => {
        expect(headerText).to.not.be.null;
        expect(headerText).to.equal("Calculate");
      });
  });

  it("should contain a <select> element that is initially set to monthly", () => {
    return pageObject
      .evaluate(() => document.querySelector("select").value)
      .then(headerText => {
        expect(headerText).to.not.be.null;
        expect(headerText).to.equal("12");
      });
  });

  it("should contain a <input> element for principal", () => {
    return pageObject
      .type("input[name=principal]", 5000)
      .evaluate(() => document.querySelector("input[name='principal']").value)
      .then(headerText => {
        expect(headerText).to.not.be.null;
        expect(headerText).to.equal("5000");
      });
  });

  it("should contain a <input> element for interest", () => {
    return pageObject
      .type("input[name=interestRate]", .02)
      .evaluate(() => document.querySelector("input[name='interestRate']").value)
      .then(headerText => {
        expect(headerText).to.not.be.null;
        expect(headerText).to.equal("0.02");
      });
  });

  it("should contain a <input> element for term", () => {
    return pageObject
      .type("input[name=loanTerm]", 10)
      .evaluate(() => document.querySelector("input[name='loanTerm']").value)
      .then(headerText => {
        expect(headerText).to.not.be.null;
        expect(headerText).to.equal("10");
      });
  });

  it("should correctly calculate monthly mortgage", () =>
    pageObject
      .wait()
      .type("input[name=principal]", 300000)
      .type("input[name=interestRate]", 3.75)
      .type("input[name=loanTerm]", 30)
      .select("select[name=period]", 12)
      .click("button#calculate")
      .wait("#output")
      .evaluate(() => document.querySelector("#output").innerText)
      .then(outputText => {
        expect(outputText).to.equal("$1389.346774716373");
      })).timeout(6500);

  it("should correctly calculate quarterly mortgage", () =>
    pageObject
      .wait()
      .type("input[name=principal]", 300000)
      .type("input[name=interestRate]", 3.75)
      .type("input[name=loanTerm]", 30)
      .select("select[name=period]", 4)
      .click("button#calculate")
      .wait("#output")
      .evaluate(() => document.querySelector("#output").innerText)
      .then(outputText => {
        expect(outputText).to.equal("$4175.068403652967");
      })).timeout(6500);
});
