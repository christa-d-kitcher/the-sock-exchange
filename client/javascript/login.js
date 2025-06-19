document.getElementById('loginButton').addEventListener('click', function() {
    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (username === "wasadmin@test.com" && password === "red") {
        document.querySelector('#loginStatus').innerHTML = 'Logged in';
    } else {
        document.querySelector('#loginStatus').innerHTML = 'Not authorized';
    }

    console.log('Username: ' + username);
    console.log('Password: ' + password);
});