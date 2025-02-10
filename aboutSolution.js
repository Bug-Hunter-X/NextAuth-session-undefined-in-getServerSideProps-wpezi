```javascript
// pages/about.js
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function getServerSideProps(context) {
  try {
    const session = await unstable_getServerSession(context.req, context.res, authOptions);
    return {
      props: {
        session
      },
    };
  } catch (error) {
    console.error('Error fetching session:', error);
    return {
      props: {
        session: null
      },
    };
  }
}

export default function About({ session }) {
  if (session) {
    return (
      <div>
        <h1>About Page</h1>
        <p>You are logged in as {session.user.email}</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>About Page</h1>
        <p>You are not logged in or session retrieval failed.</p>
      </div>
    );
  }
}
```