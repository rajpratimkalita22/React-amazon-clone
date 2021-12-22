import { Provider } from 'react-redux';
import { store } from '../app/store';
import '../styles/globals.css';
import { SessionProvider } from "next-auth/react"; 

const MyApp = ({ Component, pageProps: {session, ...pageProps} }) => {
  return (  // using the sessionProvider to allow access to the authentication state of any user for our next.js build.
    <SessionProvider session={pageProps.session}>  
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
};

export default MyApp;
