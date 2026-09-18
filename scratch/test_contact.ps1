$body = @{
    name = "Priya Mehta"
    email = "priya.mehta@techcorp.com"
    subject = "Full-Stack Opportunity"
    category = "Hiring"
    message = "We love your SIH 2024 work and want to chat."
    honeypot = ""
} | ConvertTo-Json

$res = Invoke-RestMethod -Uri "http://localhost:5173/api/contact" -Method Post -ContentType "application/json" -Body $body
$res | ConvertTo-Json
