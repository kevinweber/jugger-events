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

import Footer from 'components/Footer';
import Navbar from 'components/Navbar';

import styles from './styles.css';

function App(props) {
  return (
    <div className={styles.wrapper}>
      <Helmet
        defaultTitle="Jugger Events"
        meta={[
          { name: 'description', content: 'Jugger Events' },
        ]}
      />
      <Navbar />
      <div className={styles.holyGrailBody}>
        {React.Children.toArray(props.children)}
      </div>
      <Footer />
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
