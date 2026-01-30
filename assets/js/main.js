const form = document.forms[0];
var regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email")
const phoneInput = document.getElementById("phone")
const messageInput = document.getElementById("message");
const emailError = document.getElementById("emailError");
const btn = document.getElementById('button');

toastr.options = {
    closeButton: true,
    progressBar: true,
    positionClass: "toast-top-right",
    timeOut: 3000,
};

(function () {
    emailjs.init({
        publicKey: "SUU_me7mCjuPy_ts_",
    });
})();
form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!ValidEmail()) return;

    btn.value = "Sending...";
    btn.disabled = true;

    const serviceID = "service_1e2ockb";
    const adminTemplate = "template_x80j85b";
    const autoReplyTemplate = "template_2mnk10b";

    Promise.all([
        emailjs.sendForm(serviceID, adminTemplate, this),
        emailjs.sendForm(serviceID, autoReplyTemplate, this),
    ])
        .then(() => {
            toastr.success("Your message has been sent!");
            this.reset();
        })
        .catch((err) => {
            console.error(err);
            toastr.error("Failed to send message. Please try again.");
        })
        .finally(() => {
            btn.value = "Send";
            btn.disabled = false;
        });
});


function ValidEmail() {
    var email = emailInput.value.trim()
    if (regexEmail.test(email) == true) {
        emailInput.style.border = "";
        emailError.innerText = "";

        return true;
    } else {
        emailInput.style.border = "1px solid red";
        emailError.innerText = "Please enter a valid email";
        emailError.style.color = "red";
        return false;
    }
}