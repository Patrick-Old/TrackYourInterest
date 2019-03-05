class Stopwatch {
    constructor(display, results) {
        this.running = false;
        this.display = display;
        this.results = results;
        this.laps = [];
        this.reset();
        this.totalAmount = 0;
        this.totalEarned = 0;
        this.first = true; // helps for getting ding at first cent
        this.print(this.times);
        
    }
    
    reset() {
        this.times = [ 0, 0, 0 ];
    }
    
    start() {
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
    }
    
    lap() {
        let times = this.times;
        let li = document.createElement('li');
        li.innerText = this.format(times);
        this.results.appendChild(li);
    }
    
    stop() {
        this.running = false;
        this.time = null;
        console.log(this);
    }

    restart() {
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
        this.currentAmount = 0;
        this.totalAmount = 0;
        var totalMoneyDiv = document.getElementById("totalAmount")
        totalMoneyDiv.innerText = "$0.00";
        var currentAmountDiv = document.getElementById("currentAmount")
        currentAmountDiv.innerText = "$0.00";
        this.first = true; // helps for getting ding at first cent
        this.reset();
        this.stop();
        this.print(this.times);
    }
    
    clear() {
        clearChildren(this.results);
    }
    
    step(timestamp) {
        if (!this.running) return;
        this.calculate(timestamp);
        this.calculateInterest(timestamp);
        this.time = timestamp;
        this.print();
        requestAnimationFrame(this.step.bind(this));
    }
    
    calculate(timestamp) {
        var diff = timestamp - this.time;
        // Hundredths of a second are 100 ms
        this.times[2] += diff / 10;
        // Seconds are 100 hundredths of a second
        if (this.times[2] >= 100) {
            this.times[1] += 1;
            this.times[2] -= 100;
        }
        // Minutes are 60 seconds
        if (this.times[1] >= 60) {
            this.times[0] += 1;
            this.times[1] -= 60;
        }
    }

    calculateInterest() {
        var principal = Number(document.getElementById("principal").value)
        var addition = Number(document.getElementById("addition").value)
        var years = Number(document.getElementById("years").value)
        var rate = Number(document.getElementById("rate").value)
        if (rate > 1) { // fix different rate types given
            rate = rate / 100.0
        }
        var compoundNum = Number(document.getElementById("frequency").value)
        var i = (rate / compoundNum)
        var n = (years * compoundNum)
        var compoundInterestFormula = (principal * (Math.pow((1+i), n)))
        var annuityFormula = addition * ((Math.pow((1+i), n)) - 1) / rate
        var totalAmount = compoundInterestFormula + annuityFormula
        this.totalAmount = totalAmount
        var totalEarned = (totalAmount - (principal + (years * addition))).toFixed(2)
        this.totalEarned = totalEarned


        var totalSeconds = years * 365 * 24 * 60 * 60
        let seconds = this.times[0] * 60 + this.times[1] + this.times[2] / 100

        var current = (seconds / totalSeconds * totalEarned).toFixed(2);

        // really complicated annoying code to make sure it dings after first time.
        if (((current > this.currentAmount) && this.currentAmount > 0.0) || (current == 0.01) && this.first) {
            if (this.first) {
                this.first = false
            }
            var audioDing = new Audio("ding.m4a");
            audioDing.play();
        }

        if ((current - Math.floor(current) == 0.0) && (current >= 0.01)) { // for every dollar
            var audioHeaven = new Audio("heaven.m4a");
            audioHeaven.play();
        }
        if (current - Math.floor(current) == 0.25) {
            var coinDrop25 = new Audio("25_cents.m4a");
            coinDrop25.play();
        }
        if (current - Math.floor(current) == 0.50) {
            var coinDrop50 = new Audio("50_cents.m4a");
            coinDrop50.play();
        }
        if (current - Math.floor(current) == 0.75) {
            var coinDrop = new Audio("75_cents.m4a");
            coinDrop.play();
        }


        this.currentAmount = current
        
        var totalEarnedDiv = document.getElementById("totalAmount")
        totalEarnedDiv.innerText = "$" + this.totalAmount;
        var totalAmountDiv = document.getElementById("totalEarned")
        totalAmountDiv.innerText = "$" + this.totalEarned;
        var currentAmountDiv = document.getElementById("currentAmount")
        currentAmountDiv.innerText = "$" + this.currentAmount;

    }
    
    print() {
        this.display.innerText = this.format(this.times);
    }
    
    format(times) {
        return `\
${pad0(times[0], 2)}:\
${pad0(times[1], 2)}:\
${pad0(Math.floor(times[2]), 2)}`;
    }
}

function pad0(value, count) {
    var result = value.toString();
    for (; result.length < count; --count)
        result = '0' + result;
    return result;
}

function clearChildren(node) {
    while (node.lastChild)
        node.removeChild(node.lastChild);
}

let stopwatch = new Stopwatch(
    document.querySelector('.stopwatch'),
    document.querySelector('.results')
);