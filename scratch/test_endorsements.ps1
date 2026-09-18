$sendBody = @{
    name = "Kunal Sharma"
    email = "kunal.engineer@gmail.com"
    phone = "+91 9876543210"
} | ConvertTo-Json

Write-Host "1. Testing Send OTP..."
$sendRes = Invoke-RestMethod -Uri 'http://localhost:5173/api/verify/send-otp' -Method Post -ContentType 'application/json' -Body $sendBody
Write-Host "Session ID:" $sendRes.sessionId
Write-Host "Email OTP:" $sendRes.devHint.emailOtp
Write-Host "Phone OTP:" $sendRes.devHint.phoneOtp

Write-Host "`n2. Testing Confirm OTP..."
$confirmBody = @{
    sessionId = $sendRes.sessionId
    emailOtp = $sendRes.devHint.emailOtp
    phoneOtp = $sendRes.devHint.phoneOtp
} | ConvertTo-Json

$confirmRes = Invoke-RestMethod -Uri 'http://localhost:5173/api/verify/confirm-otp' -Method Post -ContentType 'application/json' -Body $confirmBody
Write-Host "Verified:" $confirmRes.verified
Write-Host "Ticket:" $confirmRes.verificationTicket

Write-Host "`n3. Testing Endorsement Submission with Valid Ticket..."
$endorseBody = @{
    ticket = $confirmRes.verificationTicket
    role = "Software Developer"
    organization = "TechSprint Ranchi"
    relationship = "Hackathon Collaborator"
    comment = "Abhishek is an exceptional problem solver. His mastery over full-stack engineering and rapid prototyping is outstanding."
    rating = 5
} | ConvertTo-Json

$endorseRes = Invoke-RestMethod -Uri 'http://localhost:5173/api/endorsements' -Method Post -ContentType 'application/json' -Body $endorseBody
Write-Host "Submission Success:" $endorseRes.success
Write-Host "Endorsement ID:" $endorseRes.endorsement.id
Write-Host "Endorsement Name:" $endorseRes.endorsement.name
Write-Host "Verified Gmail:" $endorseRes.endorsement.verifiedEmail
Write-Host "Verified Phone:" $endorseRes.endorsement.verifiedPhone

Write-Host "`n4. Testing Replay Attack (Reusing Same Ticket)..."
try {
    Invoke-RestMethod -Uri 'http://localhost:5173/api/endorsements' -Method Post -ContentType 'application/json' -Body $endorseBody
    Write-Host "ERROR: Should have been rejected!"
} catch {
    Write-Host "Replay rejected successfully as expected:" $_.Exception.Message
}

Write-Host "`n5. Testing Submission with Fake Ticket..."
$fakeBody = @{
    ticket = "fake-forged-ticket-123"
    role = "Hacker"
    organization = "Unverified"
    relationship = "Stranger"
    comment = "Spam attempt"
    rating = 1
} | ConvertTo-Json

try {
    Invoke-RestMethod -Uri 'http://localhost:5173/api/endorsements' -Method Post -ContentType 'application/json' -Body $fakeBody
    Write-Host "ERROR: Should have been rejected!"
} catch {
    Write-Host "Fake ticket rejected successfully as expected:" $_.Exception.Message
}
