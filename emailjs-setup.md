# EmailJS Setup Instructions

To make the contact form send real emails to minal.shalam@gmail.com, you need to set up EmailJS:

## Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose Gmail (or your preferred email provider)
4. Connect your Gmail account (minal.shalam@gmail.com)
5. Note down the **Service ID** (e.g., "service_abc123")

## Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Set up the template with these variables:
   ```
   Subject: New Contact Form Message from {{from_name}}
   
   From: {{from_name}} ({{from_email}})
   
   Message:
   {{message}}
   
   ---
   This message was sent from your personal website contact form.
   ```
4. Note down the **Template ID** (e.g., "template_xyz789")

## Step 4: Get Public Key
1. Go to "Account" > "General"
2. Find your **Public Key** (e.g., "user_abcdef123456")

## Step 5: Update the Website Code
Replace the placeholders in `script.js`:

```javascript
// Line 255: Replace YOUR_PUBLIC_KEY
emailjs.init("your_actual_public_key_here");

// Line 289: Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID
emailjs.send('your_service_id_here', 'your_template_id_here', templateParams)
```

## Step 6: Test the Form
1. Open your website
2. Fill out the contact form
3. Submit it
4. Check minal.shalam@gmail.com for the email

## Security Note
The public key, service ID, and template ID are safe to include in client-side code. EmailJS handles the security on their end.

## Free Tier Limits
- 200 emails per month
- EmailJS branding in emails
- Upgrade to paid plan for more emails and to remove branding
