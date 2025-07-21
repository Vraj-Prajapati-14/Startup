# Email Setup Guide

## Prerequisites

Install the required dependencies:

```bash
cd server
npm install nodemailer express-validator
```

## Environment Variables

Add the following environment variables to your `.env` file:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## Gmail Setup

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password in `EMAIL_PASS`

## Email Templates

The system includes two professional email templates:

### Admin Notification Email
- Sent to admin when a new contact form is submitted
- Includes all contact details in a formatted HTML email
- Professional styling with company branding

### User Confirmation Email
- Sent to the user who submitted the form
- Thank you message with project summary
- Next steps and contact information
- Professional styling with social links

## Features

### Contact Form
- ✅ Professional styling with icons
- ✅ Form validation
- ✅ Loading states
- ✅ Success/error notifications
- ✅ Responsive design

### Email Notifications
- ✅ Admin notification on form submission
- ✅ User confirmation email
- ✅ Professional HTML email templates
- ✅ Error handling

### Admin Panel
- ✅ Contact management dashboard
- ✅ Search and filtering
- ✅ Status management
- ✅ Reply tracking
- ✅ Statistics overview
- ✅ Pagination
- ✅ Modal for detailed view

### Backend API
- ✅ Contact form submission
- ✅ Email sending with nodemailer
- ✅ Contact listing with pagination
- ✅ Search and filter functionality
- ✅ Status updates
- ✅ Statistics endpoint
- ✅ Input validation

## Usage

1. **User submits contact form** → Email sent to admin + confirmation to user
2. **Admin receives notification** → Can view in admin panel
3. **Admin can update status** → Track communication progress
4. **Admin can add notes** → Record internal communication
5. **Admin can mark as replied** → Track response status

## Security Notes

- Use app passwords, not your main Gmail password
- Keep environment variables secure
- Consider rate limiting for contact form submissions
- Validate all input data
- Sanitize email content to prevent XSS

## Troubleshooting

### Email not sending
- Check Gmail app password is correct
- Verify 2FA is enabled
- Check email credentials in environment variables
- Review server logs for error messages

### Form submission errors
- Check API endpoint is accessible
- Verify database connection
- Check form validation rules
- Review browser console for errors 