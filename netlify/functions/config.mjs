export default async () => {
  return new Response(JSON.stringify({
    apiKey:            Netlify.env.get('FIREBASE_API_KEY'),
    authDomain:        Netlify.env.get('FIREBASE_AUTH_DOMAIN'),
    databaseURL:       Netlify.env.get('FIREBASE_DATABASE_URL'),
    projectId:         Netlify.env.get('FIREBASE_PROJECT_ID'),
    storageBucket:     Netlify.env.get('FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: Netlify.env.get('FIREBASE_MESSAGING_SENDER_ID'),
    appId:             Netlify.env.get('FIREBASE_APP_ID'),
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const config = { path: '/api/config' };
