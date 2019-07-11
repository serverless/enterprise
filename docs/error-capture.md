# Capturing non-fatal errors in the Enterprise Dashboard

Sometimes, your lambda will "fail" but actually can't really fail. One very common example is
functions tied to HTTP endpoints. Those usually should still return JSON, even if there is an error
since the API GW integration will fail rather than returning a meaningful error.

For this case, we provide a `captureError` function available on either the `context` or on the
module imported from `'./serverless-sdk'`. This will cause the invocation to still display as an
error in the serverless dashboard while allowing you to return an error to the user.

Here is an example of how to use it from the `context` object:

```javascript
module.exports.hello = async (event, context) => {
  try {
    // do some real stuff but it throws an error, oh no!
    throw new Error('aa')
  } catch (error) {
    context.captureError(error)
  }
  return {
    statusCode: 600,
    body: JSON.stringify({ name: 'bob' }),
  };
};
```

And to import it instead, import with `const { captureError } = require('./serverless-sdk')` then
call `captureError` instead of `context.captureError`.

