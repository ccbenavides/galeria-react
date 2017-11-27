import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Gallery from './components/Gallery';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Gallery {...(root.dataset)} />, document.getElementById('root'));
registerServiceWorker();
