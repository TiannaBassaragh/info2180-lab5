document.addEventListener('DOMContentLoaded', () => {
    const resultDiv = document.getElementById('result');
    const lookupBtn = document.getElementById('lookup');
    const countryInput = document.getElementById('country');
    const lookupCitiesBtn = document.getElementById('lookup-cities');

    lookupBtn.addEventListener('click', () => {
        resultDiv.textContent = 'Loading Countries...';

        fetch('world.php?country=' + countryInput.value.trim())
            .then(response => {
                if (!response.ok) throw new Error('<p>Status: ' + response.status + '</p>' + '<p>Message: ' + response.statusText + '</p>');
                return response.text();
            })
            .then(data => {
                resultDiv.innerHTML = data;
            })
            .catch(err => {
                resultDiv.innerHTML = '<p>Oh no ☹️! There was an error retrieving your data. </p>' + err.message;
                console.error(err);
            });
    });

    lookupCitiesBtn.addEventListener('click', () => {
        resultDiv.textContent = 'Loading Cities...';

        fetch('world.php?country=' + countryInput.value.trim() + '&lookup=cities')
            .then(response => {
                if (!response.ok) throw new Error('<p>Status: ' + response.status + '</p>' + '<p>Message: ' + response.statusText + '</p>');
                return response.text();
            })
            .then(data => {
                resultDiv.innerHTML = data;
            })
            .catch(err => {
                resultDiv.innerHTML = '<p>Oh no ☹️! There was an error retrieving your data. </p>' + err.message;
                console.error(err);
            });
    });
});