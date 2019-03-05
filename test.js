calculateInterest() {
    var principal = Number(document.getElementById("principal").value)
    //var addition = Number(document.getElementById("addition").value)
    var years = Number(document.getElementById("years").value)
    var rate = Number(document.getElementById("rate").value) / 100.0
    var compoundNum = 365
    var compoundInterestFormula = (principal * Math.pow((1 + (rate / (compoundNum))), (years * compoundNum)));
    //var annuityFormula = addition*(1 + rate)*((Math.pow(1 + rate, years) - 1) / rate)
    var result = compoundInterestFormula // + annuity formula
    result = result.toFixed(2)


    var totalSeconds = years * 365 * 24 * 60 * 60
    let seconds = this.times[0] * 60 + this.times[1] + this.times[2] / 100

    var current = (seconds / totalSeconds * result).toFixed(2);

    print ("RESULT")
    print (totalSeconds)


    this.currentAmount = current
    

    var totalMoneyDiv = document.getElementById("totalAmount");
    totalMoneyDiv.innerText = "$" + result;
    var currentAmountDiv = document.getElementById("currentAmount");
    currentAmountDiv.innerText = "$" + this.currentAmount;
}