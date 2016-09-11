/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';

import Img from 'components/Img';
import Footer from 'components/Footer';
import Logo from './logo.png';
import Navbar from 'components/Navbar';

import styles from './styles.css';

function App(props) {
  return (
    <div className={styles.wrapper}>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
        meta={[
          { name: 'description', content: 'A React.js Boilerplate application' },
        ]}
      />
      <Navbar />
      <div className={styles.logoWrapper} href="/">
        <Img className={styles.logo} src={Logo} alt="Jugger Events - Logo" />
      </div>
      {React.Children.toArray(props.children)}
      <Footer />
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
