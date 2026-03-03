export const SEND_VERIFICATION_EMAIL = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>verfify email</title>
</head>
<body style="background-color: white; color: black;">
  <div><h1>Verify Your Email</h1></div>
  
  <div>
    <p>You have successfully signed up ton Node class website. This is your verification token
  </p>

    <p>Verification Token </p>
    <p>{verficationToken}</p>
  </div>
</body>
</html>`

export const SEND_SUCCESSFUL_VERIFICATION_EMAIL = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>verfify email</title>
</head>
<body style="background-color: white; color: black;">
  <div><h1>Verify Your Email</h1></div>
  
  <div>
    <p>You have successfully verified your email. This is your verification token
  </p>

    <p>Verification Token </p>
    <p>{verficationToken}</p>
  </div>
</body>
</html>`