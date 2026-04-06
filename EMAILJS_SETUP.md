# EmailJS Setup Guide - Complete Instructions

## 🚀 Quick Setup (5 minutes)

### Step 1: Sign Up for EmailJS
1. Go to **https://www.emailjs.com/**
2. Click **"Sign Up"** (free plan allows 200 emails/month)
3. Sign up with Google or email
4. Verify your email address

### Step 2: Add Email Service
1. In EmailJS dashboard, click **"Email Services"**
2. Click **"Add New Service"**
3. Choose **"Gmail"** (recommended)
4. Click **"Connect"** and sign in with your Gmail
5. **Important**: Use `casagleam1985@gmail.com` to connect
6. Click **"Create Service"**
7. **Copy your Service ID** (looks like: `service_xxxxxxxxxx`)

### Step 3: Create Email Template
1. Click **"Email Templates"** → **"Create New Template"**
2. **Template Name**: `Travel Contact Form`
3. **Subject**: `New Travel Inquiry: {{subject}}`
4. **Email To**: `casagleam1985@gmail.com`
5. **HTML Content**:
```html
<h3>New Travel Inquiry</h3>
<p><strong>From:</strong> {{from_name}} ({{from_email}})</p>
<p><strong>Phone:</strong> {{from_phone}}</p>
<p><strong>Address:</strong> {{from_address}}</p>
<hr>
<p><strong>Subject:</strong> {{subject}}</p>
<p><strong>Message:</strong></p>
<p>{{message}}</p>
<hr>
<p><small>Submitted: {{timestamp}}</small></p>
```
6. Click **"Save"**
7. **Copy your Template ID** (looks like: `template_xxxxxxxxxx`)

### Step 4: Get API Key
1. Click **"Integration"** → **"API Keys"**
2. Click **"Create API Key"**
3. **Copy your Public Key** (32 character string)

### Step 5: Update Your Code
Replace these 3 values in `main.js`:

**Line 24**: Replace `YOUR_PUBLIC_KEY_HERE` with your Public Key
```javascript
emailjs.init("YOUR_ACTUAL_PUBLIC_KEY_HERE");
```

**Line 387**: Replace `service_placeholder` with your Service ID
```javascript
emailjs.send('service_your_service_id', 'template_placeholder', templateParams)
```

**Line 387**: Replace `template_placeholder` with your Template ID
```javascript
emailjs.send('service_your_service_id', 'template_your_template_id', templateParams)
```

## 🎯 What You Need to Replace

You will get these 3 values from EmailJS:
1. **Public Key**: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
2. **Service ID**: `service_xxxxxxxxxx`
3. **Template ID**: `template_xxxxxxxxxx`

## 📧 How It Works After Setup

1. Customer fills out contact form
2. EmailJS sends email directly to `casagleam1985@gmail.com`
3. No email client opens - it's automatic!
4. You receive professional formatted email
5. Customer sees success message

## 🔧 Troubleshooting

**If EmailJS fails:**
- Check your Service ID, Template ID, and Public Key
- Make sure Gmail service is connected
- Verify template variables match exactly

**If you don't receive emails:**
- Check your Gmail spam folder
- Verify EmailJS dashboard shows successful sends
- Make sure your template is active

## 📞 Need Help?

Once you have the 3 IDs from EmailJS, tell me and I'll update your code immediately!

Or if you prefer, I can walk you through each step of the setup process.
