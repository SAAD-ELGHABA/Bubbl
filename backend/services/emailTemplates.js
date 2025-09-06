export const verificationEmailTemplate = ({ name, verificationUrl }) => {
  return `
    <div style="
        font-family: Arial, sans-serif;
        line-height: 1.6;
        text-align: center;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border-radius: 10px;
        background: linear-gradient(to right, #022F56, #488DB4);
        color: #f0f0f0;
    ">
        <!-- White Container -->
        <div style="
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            text-align: center;
            color: #001219;
        ">
            <!-- Logo -->
            <div style="margin-bottom: 20px;margin-top: 20px;">
                <img src="https://res.cloudinary.com/soukvendor/image/upload/v1757005097/BUBBL-v-1_r8ubxu.png"
                     alt="Bubbl Dream Logo"
                     style="width: 150px; height: auto; display: block; margin: 0 auto;" />
            </div>

            <!-- Greeting -->
            <p style="font-size: 18px; font-weight: bold; color: #001219;">Hello ${name},</p>

            <!-- Message -->
            <p style="font-size: 16px; color: #001219;">Thank you for registering on Bubbl Dream!</p>
            <p style="font-size: 16px; color: #001219;">Please click the button below to verify your email:</p>

            <!-- Verification Button -->
            <a href="${verificationUrl}"
               style="
                   display: inline-block;
                   padding: 12px 25px;
                   background: linear-gradient(to right, #022F56, #488DB4);
                   color: #ffffff;
                   font-weight: bold;
                   text-decoration: none;
                   border-radius: 5px;
                   font-size: 16px;
                   margin: 20px 0;
                   width:150px;
               ">
               Verify Email
            </a>

            <!-- Expiry Note -->
            <p style="font-size: 14px; color: #555555;">This link will expire in 10 minutes.</p>

            <!-- Footer -->
            <p style="font-size: 12px; color: #555555;">Thanks,<br/>Bubbl Dream Team</p>
        </div>
    </div>
  `;
};
