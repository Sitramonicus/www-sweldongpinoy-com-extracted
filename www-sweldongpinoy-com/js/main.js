var taxExemptBonus = 90000

function formatCurrencyInput(inputBox) {
	inputBox.value = formatCurrency(inputBox.value);
}

function formatCurrency(num) {
	if(!num) {
		return "0.00"
	}

	num = convertCurrencyToNumber(num)
	cents = "0." + num.toString().split('.')[1]
	if (cents == null || isNaN(cents)) {
		cents = 0
	}
	cents = (cents * 100).toFixed(0)

	if (num.includes(".")) {
		num = num.substring(0, num.indexOf("."))
	}

	if (cents >= 100) {
		cents = cents - 100
		num = num.substring(0, num.length-1) + (Number(num.substring(num.length-1, num.length)) + 1)
	}

	if (cents < 10) {
		cents = "0" + cents
	}

	for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
		num = num.substring(0, num.length - (4 * i + 3)) + ','
				+ num.substring(num.length - (4 * i + 3))
	}
	return num + '.' + cents
}

function convertCurrencyToNumber(currency) {
	var formattedCurrency = currency.toString().replace(/\$|\,| /g, '');
	if (isNaN(formattedCurrency)) {
		formattedCurrency = "0";
	}
	return formattedCurrency;
}

function formatTextAsDecimal(text) {
	return parseFloat(convertCurrencyToNumber(text)) || 0;
}

function getTaxable13thMonth(thirteenthMonth) {
	return Math.max(0, thirteenthMonth - taxExemptBonus)
}

function getNontaxable13thMonth(thirteenthMonth) {
	if (thirteenthMonth >= taxExemptBonus) {
		return taxExemptBonus;
	} else {
		return thirteenthMonth;
	}
}
