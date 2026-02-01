const mailContent = (token:string) => {
    return `
<div style="
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
">
    <div style="
        background-color: #4f46e5;
        color: white;
        padding: 20px;
        border-radius: 8px 8px 0 0;
        text-align: center;
    ">
        <h1 style="margin: 0; font-size: 24px;">Password Reset</h1>
    </div>
    
    <div style="
        background-color: white;
        padding: 30px;
        border-radius: 0 0 8px 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    ">
        <p style="
            font-size: 16px;
            line-height: 1.6;
            color: #333;
            margin-bottom: 20px;
        ">
            You requested a password reset. Click the button below to save your new password:
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.DOMAIN}/api/account/reset-password/verfy?token=${token}" 
               style="
                    background-color: #4f46e5;
                    color: white;
                    padding: 14px 28px;
                    text-decoration: none;
                    border-radius: 6px;
                    font-weight: bold;
                    display: inline-block;
                    font-size: 16px;
                    transition: background-color 0.3s;
               "
               onmouseover="this.style.backgroundColor='#4338ca'"
               onmouseout="this.style.backgroundColor='#4f46e5'">
                Reset Password
            </a>
        </div>
        
        <p style="
            font-size: 14px;
            color: #666;
            line-height: 1.5;
            margin-top: 25px;
            padding-top: 20px;
            border-top: 1px solid #eee;
        ">
            <strong>Note:</strong> This link is valid for <strong style="color: #ef4444;">10 minutes</strong> only.<br>
            If you didn't request this password reset, please ignore this email or contact support if you have concerns.
        </p>
        
        <div style="
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 12px;
            color: #888;
            text-align: center;
        ">
            <p style="margin: 5px 0;">
                Need help? <a href="${process.env.DOMAIN}/contact" style="color: #4f46e5;">Contact Support</a>
            </p>
        </div>
    </div>
</div>
`;
}


export default mailContent;