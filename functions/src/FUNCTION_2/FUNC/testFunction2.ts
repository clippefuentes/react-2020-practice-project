import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

exports = module.exports = functions.runWith({ timeoutSeconds: 540, memory: '256MB' })
    .https.onRequest((request, response) => {
        functions.logger.info("FUNCTION_2 Invoked!", {structuredData: true});
        response.send("Hello from FUNCTION_2 Function!  ");
    });
