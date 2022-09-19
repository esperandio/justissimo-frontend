import React, { useEffect, useState } from 'react';
import { withWebChat } from '@ibm-watson/assistant-web-chat-react';
import CustomResponsePortalsContainer from './CustomResponsePortalsContainer';

function App({ createWebChatInstance }) {
  const [instance, setInstance] = useState(null);

  useEffect(() => {
    const watsonAssistantChatOptions = {
      integrationID: process.env.REACT_APP_INTEGRATION_ID,
      region: process.env.REACT_APP_REGION,
      onLoad: wacInstance => {
        setInstance(wacInstance);
        wacInstance.render();
      },
    }
    createWebChatInstance(watsonAssistantChatOptions);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App">
      {instance && <CustomResponsePortalsContainer instance={instance} />}
    </div>
  );
}

export default withWebChat()(App);