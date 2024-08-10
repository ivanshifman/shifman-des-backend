export const mailTemplates = {
    register: (mail) => `
        <html>
          <head>
            <style>
              body {
                font-family: 'Helvetica Neue', Arial, sans-serif;
                background-color: #f9f9f9;
                margin: 0;
                padding: 20px;
                box-sizing: border-box;
              }
              .container {
                max-width: 600px;
                margin: auto;
                background: #ffffff;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                border: 1px solid #e0e0e0;
                box-sizing: border-box;
              }
              h1 {
                color: #3f51b5;
                font-size: 2em;
                margin-bottom: 15px;
                font-weight: bold;
                word-break: break-word;
                overflow-wrap: break-word;
              }
              p {
                font-size: 1.125em;
                color: #555555;
                line-height: 1.6;
                margin: 0 0 15px 0;
              }
              .footer {
                border-top: 1px solid #e0e0e0;
                padding-top: 15px;
                margin-top: 20px;
                text-align: center;
                color: #3f51b5;
                font-size: 1em;
              }
  
              /* Media Queries */
              @media (max-width: 600px) {
                .container {
                  padding: 15px;
                }
                h1 {
                  font-size: 1.5em;
                }
                p {
                  font-size: 1em;
                }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Welcome, ${mail}!</h1>
              <p>Thank you for joining our community! We're thrilled to have you on board.</p>
              <p>As a new member, you now have access to exclusive offers and updates. Stay tuned for the latest products and deals.</p>
              <p>If you have any questions, feel free to reach out to us. We're here to help you make the most of your experience.</p>
              <p class="footer">Best regards,<br>The Ecommerce Shifman Team</p>
            </div>
          </body>
        </html>
      `,
  
    purchase: (mail) => `
        <html>
          <head>
            <style>
              body {
                font-family: 'Helvetica Neue', Arial, sans-serif;
                background-color: #f9f9f9;
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              .container {
                max-width: 600px;
                margin: auto;
                background: #ffffff;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                border: 1px solid #e0e0e0;
                box-sizing: border-box;
              }
              h1 {
                color: #3f51b5;
                font-size: 2em; /* Adjusted for responsiveness */
                margin-bottom: 15px;
                font-weight: bold;
                word-break: break-word;
                overflow-wrap: break-word;
              }
              p {
                font-size: 1.125em;
                color: #555555;
                line-height: 1.6;
                margin: 0 0 15px 0;
              }
              .footer {
                border-top: 1px solid #e0e0e0;
                padding-top: 15px;
                margin-top: 20px;
                text-align: center;
                color: #3f51b5;
                font-size: 1em; /* Adjusted for responsiveness */
              }
  
              /* Media Queries */
              @media (max-width: 600px) {
                .container {
                  padding: 15px;
                }
                h1 {
                  font-size: 1.5em;
                }
                p {
                  font-size: 1em;
                }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Thank You for Your Purchase ${mail}!</h1>
              <p>We’re excited to get your order ready and shipped to you.</p>
              <p>Your satisfaction is our priority, so if you have any questions or need assistance, don't hesitate to contact us.</p>
              <p>We hope you enjoy your new items, and we look forward to serving you again in the future.</p>
              <p class="footer">Best regards,<br>The Ecommerce Shifman Team</p>
            </div>
          </body>
        </html>
      `,
  };
  
