const { Resend } = require('resend');

// Test the exact Vercel failure mode
async function runTest() {
    const resend = new Resend("re_C9tF4ekZ_JcYmQTmFpsci5V9wz22o2wF7");
    try {
        const result = await resend.emails.send({
            from: "support@offertrack.com", // Simulating a wrong Vercel variable
            to: "p.shreyambbk@gmail.com",
            subject: 'Test',
            html: '<p>Test</p>'
        });

        console.log("Result:", result);
    } catch (e) {
        console.error("Crash:", e);
    }
}

runTest();
