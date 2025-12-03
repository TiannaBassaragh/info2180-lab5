document.addEventListener('DOMContentLoaded', () => {
    const lookupBtn = document.getElementById('lookup');
    const resultDiv = document.getElementById('result');
    const lookupInput = document.getElementById('country');

    lookupBtn.addEventListener('click', () => {
        resultDiv.textContent = 'Loading...';

        fetch('world.php?country=' + lookupInput.value.trim())
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