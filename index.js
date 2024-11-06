const Login = document.getElementById('login');
        Login.addEventListener("submit", function(e) {
            e.preventDefault(); 
            const user = document.getElementById('user').value;
            const pass = document.getElementById('pass').value;
            const errormsg = document.getElementById('error'); 

    
            if (user.length < 5) {
                errormsg.textContent = "Username must be at least 5 characters long.";
                return;
            }
            if (pass.length < 8) {
                errormsg.textContent = "Password must be at least 8 characters long.";
                return;
            }

        
            errormsg.textContent = "";
            alert("Form submitted successfully!");
            window.location.href="converter.html"
        });

        // currncy converter
        const apiURL = "https://api.exchangerate-api.com/v4/latest/${fromCurrency}";

        document.addEventListener("DOMContentLoaded", () => {
            const fromCurrency = document.getElementById("from-currency");
            const toCurrency = document.getElementById("to-currency");
            const amountInput = document.getElementById("amount");
            const resultDisplay = document.getElementById("result");
        
            // Check if elements are correctly selected
            if (!fromCurrency || !toCurrency) {
                console.error("Currency dropdown elements not found.");
                return;
            }
        
            // Fetch exchange rates and populate dropdowns
            fetch(apiURL)
                .then(response => response.json())
                .then(data => {
                    // Ensure the response has the expected structure
                    if (!data.rates) {
                        console.error("Invalid API response. Missing 'rates' data.");
                        return;
                    }
        
                    const currencies = Object.keys(data.rates);
        
                    // Populate both dropdowns with currency options
                    currencies.forEach(currency => {
                        const option1 = document.createElement("option");
                        option1.value = currency;
                        option1.textContent = currency;
                        fromCurrency.appendChild(option1);
        
                        const option2 = document.createElement("option");
                        option2.value = currency;
                        option2.textContent = currency;
                        toCurrency.appendChild(option2);
                    });
        
                    // Set default selections
                    fromCurrency.value = "USD";
                    toCurrency.value = "EUR";
        
                    console.log("Currency options populated.");
        
                })
                .catch(error => {
                    console.error("Error fetching exchange rates:", error);
                });
        
            // Handle form submission for currency conversion
            document.getElementById("currency-form").addEventListener("submit", (event) => {
                event.preventDefault();
        
                const amount = parseFloat(amountInput.value);
                const from = fromCurrency.value;
                const to = toCurrency.value;
        
                if (isNaN(amount) || amount <= 0) {
                    resultDisplay.textContent = "Please enter a valid amount.";
                    return;
                }
        
                
                fetch(`${apiURL}`)
                    .then(response => response.json())
                    .then(data => {
                        const fromRate = data.rates[from];
                        const toRate = data.rates[to];
        
                    
                        if (!fromRate || !toRate) {
                            resultDisplay.textContent = "Exchange rate data not available.";
                            return;
                        }
        
                        const convertedAmount = (amount / fromRate) * toRate;
                        resultDisplay.textContent = `${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}`;
                    })
                    .catch(error => {
                        console.error("Error during conversion:", error);
                        resultDisplay.textContent = "Conversion failed. Please try again.";
                    });
            });
        });
        