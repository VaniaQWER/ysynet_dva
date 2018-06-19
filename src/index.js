import dva from 'dva';
import './index.css';
import './fixed.css'

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/basic').default);
// app.model(require('./models/socket').default);
// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
