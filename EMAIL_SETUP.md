# Email Setup Guide for Travel Packages Website

## Quick Setup (5 minutes)

### Option 1: EmailJS (Recommended - Free)

1. **Sign up for EmailJS**
   - Go to https://www.emailjs.com/
   - Create a free account
   - Verify your email

2. **Create Email Service**
   - Click "Email Services" → "Add New Service"
   - Choose "Gmail" (or your preferred email service)
   - Connect your email account
   - Note your **Service ID**

3. **Create Email Template**
   - Click "Email Templates" → "Create New Template"
   - Template Name: "Travel Contact Form"
   - Subject: `New Travel Inquiry: {{subject}}`
   - HTML Content:
   ```html
   <h3>New Contact Inquiry</h3>
   <p><strong>Name:</strong> {{from_name}}</p>
   <p><strong>Email:</strong> {{from_email}}</p>
   <p><strong>Phone:</strong> {{from_phone}}</p>
   <p><strong>Address:</strong> {{from_address}}</p>
   <p><strong>Subject:</strong> {{subject}}</p>
   <p><strong>Message:</strong></p>
   <p>{{message}}</p>
   <p><strong>Submitted:</strong> {{timestamp}}</p>
   ```

4. **Get Your Credentials**
   - **Service ID**: From Email Services page
   - **Template ID**: From Email Templates page  
   - **Public Key**: From "Integration" → "API Keys"

5. **Update main.js**
   Replace these lines in main.js:
   ```javascript
   // Line 25: Replace YOUR_PUBLIC_KEY
   emailjs.init("YOUR_PUBLIC_KEY");
   
   // Line 388: Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID
   emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
   ```

### Option 2: Simple Mailto (No setup required)

The website already includes a fallback that opens your email client with pre-filled information.

## Testing Your Setup

1. Go to your contact page
2. Fill out the form with test information
3. Click "Send Message"
4. Check if you receive the email

## Troubleshooting

**If EmailJS doesn't work:**
- Verify your Service ID, Template ID, and Public Key
- Check your email service connection
- Make sure your template variables match

**If you don't receive emails:**
- Check your spam folder
- Verify EmailJS is sending successfully
- Test with a different email service

## Current Fallback

If EmailJS fails, the system will:
1. Open your default email client
2. Pre-fill the email with client information
3. Allow you to send manually

This ensures you never miss client inquiries!
