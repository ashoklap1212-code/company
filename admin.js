// login check
if (localStorage.getItem("adminLogin") !== "true") {
    window.location.href = "adminlogin.html"
}

function logout() {
    localStorage.removeItem("adminLogin")
    window.location.href = "adminlogin.html"
}

const supabaseUrl = "https://qplpewgzyztkexplrmwe.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwbHBld2d6eXp0a2V4cGxybXdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NTI3NjYsImV4cCI6MjA4ODUyODc2Nn0.DnVrlC9XBCDo8Ria3-0zEi1qH1pfz46vIO1q9d3D9G0"

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)

// Load leads
async function loadLeads() {

    const { data, error } = await supabaseClient
        .from("contact")
        .select("*")

    if (error) {
        console.log(error)
        return
    }

    document.getElementById("totalLead").innerText = data.length

    let rows = ""

    data.forEach(user => {
        rows += `
<tr>
<td>${user.name}</td>
<td>${user.phone}</td>
<td>${user.email}</td>
<td>${user.message}</td>
<td>
<button class="delete-btn" onclick="deleteLead(${user.id})">
Delete
</button>
</td>
</tr>
`
    })

    document.getElementById("leadTable").innerHTML = rows
}

// Delete function ⭐
async function deleteLead(id) {

    if (!confirm("Are you sure delete?")) return

    const { error } = await supabaseClient
        .from("contacts")
        .delete()
        .eq("id", id)

    if (error) {
        alert("Delete failed")
        console.log(error)
    } else {
        alert("Deleted successfully")
        loadLeads() // refresh table
    }

}

// Call loadLeads on page load
loadLeads()