const expect = require("chai").expect;
const Mortgage = require("../../src/js/lib/Mortgage");

describe("Mortgage Calculator", () => {

  beforeEach(() => {
    mortgage = new Mortgage(1000, .05, 10, 5);
  });

  it("should have an monthly payment function", () => {
    expect(mortgage.monthlyPayment()).to.exist;
  });

  it("should have the correct principal", () => {
    expect(mortgage.principal).to.equal(1000);
  });

  it("should have the correct interest", () => {
    expect(mortgage.interest).to.equal(.05);
  });

  it("should have the correct term", () => {
    expect(mortgage.term).to.equal(10);
  });

  it("should have the correct period", () => {
    expect(mortgage.period).to.equal(5);
  });

  it('should calulate mortage', () => {
    expect(mortgage.monthlyPayment()).to.equal(20.051041647902807);
  });
});
