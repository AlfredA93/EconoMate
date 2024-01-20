document.getElementById('convert-button').addEventListener('click', function() {
    const baseCurrency = document.getElementById('base-currency').value;
    const targetCurrency = document.getElementById('target-currency').value;
    const amountToConvert = parseFloat(document.getElementById('current-currency').value);
    
    // Fetch Function to Make the Request
    fetch(`https://api.frankfurter.app/latest?from=${baseCurrency}&to=${targetCurrency}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const rate = data.rates[targetCurrency];
            const convertedAmount = amountToConvert * rate;
            document.getElementById('converted-amount').textContent = convertedAmount.toFixed(2);
        })
        .catch(error => {
            document.getElementById('error-message').textContent = error.message;
        });
});
