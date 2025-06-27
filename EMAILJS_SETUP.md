# 📧 EmailJS Setup Instructions

## 🚀 Quick Setup (5 minutes)

### Step 1: Create EmailJS Account
1. Go to **https://www.emailjs.com/**
2. Click **"Sign Up"** (free account)
3. Verify your email address

### Step 2: Create Email Service
1. In EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended for testing)
   - **Outlook/Hotmail**
   - **Yahoo**
   - **Custom SMTP**
4. Follow the connection wizard
5. **Copy the Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template
1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Use this template content:

```
Subject: New Contact Form Message from {{from_name}}

Hello {{to_name}},

You have received a new message from your restaurant website:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Message:
{{message}}

---
This message was sent from your restaurant contact form.
Reply directly to: {{reply_to}}
```

4. **Copy the Template ID** (e.g., `template_xyz789`)

### Step 4: Get Public Key
1. Go to **"Account"** → **"General"**
2. **Copy your Public Key** (e.g., `abc123def456`)

### Step 5: Update Your Website
1. Open `/public/contact.js`
2. Replace these values:
```javascript
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your public key
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
//          ↑ Replace both IDs
```

**Example:**
```javascript
emailjs.init("abc123def456");
emailjs.send('service_abc123', 'template_xyz789', templateParams)
```

### Step 6: Test!
1. Open your website
2. Fill out the contact form
3. Submit and check your email!

## 🎯 Current Configuration

Your contact form will send emails with:
- **Customer Name** and **Email**
- **Phone Number** (if provided)
- **Message/Comments**
- **Reply-to** set to customer's email

## 🔧 Troubleshooting

**"Failed to send"?**
- Check Service ID and Template ID are correct
- Verify Public Key is correct
- Make sure email service is connected properly

**Not receiving emails?**
- Check spam folder
- Verify template recipient email
- Test with different email service

## 💡 Free Limits
- **200 emails/month** (free plan)
- Perfect for restaurant contact forms
- Upgrade available if needed

## 🚀 Ready to Go!
Once you complete these steps, your contact form will send real emails directly to your inbox!
