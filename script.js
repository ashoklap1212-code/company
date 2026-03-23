const supabaseUrl = "https://qplpewgzyztkexplrmwe.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwbHBld2d6eXp0a2V4cGxybXdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NTI3NjYsImV4cCI6MjA4ODUyODc2Nn0.DnVrlC9XBCDo8Ria3-0zEi1qH1pfz46vIO1q9d3D9G0"

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)

document.getElementById("contactForm").addEventListener("submit", async function(e) {

    e.preventDefault()

    const name = document.getElementById("name").value
    const phone = document.getElementById("phone").value
    const email = document.getElementById("email").value
    const message = document.getElementById("message").value

    const { data, error } = await supabaseClient
        .from("contact")
        .insert([
            { name: name, phone: phone, email: email, message: message }
        ])

    function showToast(message, type) {
        const toast = document.getElementById("toast");
        toast.innerText = message;
        toast.className = "toast show " + type;

        setTimeout(() => {
            toast.className = "toast";
        }, 3000);
    }

    if (error) {
        console.log(error);
        showToast("Error sending message", "error");
    } else {
        showToast("Message sent successfully!", "success");
        document.getElementById("contactForm").reset();
    }
})




document.addEventListener("DOMContentLoaded", function() {

    const toggleBtn = document.getElementById("themetoggle");

    if (toggleBtn) {

        // Load saved theme
        if (localStorage.getItem("theme") === "light") {
            document.body.classList.add("light-mode");
            toggleBtn.textContent = "🌞";
        }

        toggleBtn.addEventListener("click", () => {

            document.body.classList.toggle("light-mode");

            if (document.body.classList.contains("light-mode")) {
                localStorage.setItem("theme", "light");
                toggleBtn.textContent = "🌞";
            } else {
                localStorage.setItem("theme", "dark");
                toggleBtn.textContent = "🌙";
            }

        });

    }

});

function scrollToContact() {
    document.getElementById("contact").scrollIntoView({
        behavior: "smooth"
    });
}

function openWhatsApp() {
    let phone = "919150479376"; // உங்கள் WhatsApp number (country code உடன்)
    let message = "Hello, I want to contact you";

    let url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);
    window.open(url, "_blank");
}