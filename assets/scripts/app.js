const numberButtons = document.querySelectorAll(".data-button");
const operationButtons = document.querySelectorAll(".operation-button");
const equalButton = document.querySelector(".equal-button");
const clearAllButton = document.querySelector(".clear-all");
const deleteButton = document.querySelector(".delete");
const previousOperandTextElement = document.querySelector(
	"[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
	"[data-current-operand]"
);

class Calculator {
	constructor(previousOperandTextElement, currentOperandTextElement) {
		this.previousOperandTextElement = previousOperandTextElement;
		this.currentOperandTextElement = currentOperandTextElement;
		this.clear();
	}

	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}

	clear() {
		this.currentOperand = "";
		this.previousOperand = "";
		this.previousOperandTextElement.innerText = "";
		this.operation = undefined;
	}

	chooseOperation(operation) {
		if (this.currentOperand === "") return;
		if (this.previousOperand !== "") {
			this.compute();
		}
		this.operation = operation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = "";
	}

	compute() {
		let computatiton;
		const prev = parseFloat(this.previousOperand);
		const curr = parseFloat(this.currentOperand);
		if (isNaN(prev) || isNaN(curr)) return;
		switch (this.operation) {
			case "+":
				computatiton = prev + curr;
				break;
			case "-":
				computatiton = prev - curr;
				break;
			case "x":
				computatiton = prev * curr;
				break;
			case "/":
				if (curr != 0) {
					computatiton = prev / curr;
				} else {
					return;
				}
				break;
			default:
				return;
		}

		this.currentOperand = computatiton;
		computatiton = undefined;
		this.previousOperand = "";
		this.operation = "";
	}

	appendNumber(number) {
		if (number === "." && this.currentOperand.includes(".")) {
			return;
		}
		if (this.currentOperand == 0) {
			this.currentOperand = number;
			return;
		}
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}
	updateDisplay() {
		this.currentOperandTextElement.innerText = this.currentOperand;
		if (this.operation != null) {
			this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
		}
	}
}

const calculator = new Calculator(
	previousOperandTextElement,
	currentOperandTextElement
);

numberButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});

operationButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	});
});

equalButton.addEventListener("click", (button) => {
	calculator.compute();
	calculator.updateDisplay();
});

clearAllButton.addEventListener("click", (button) => {
	calculator.clear();
	calculator.updateDisplay();
});
deleteButton.addEventListener("click", (button) => {
	calculator.delete();
	calculator.updateDisplay();
});
