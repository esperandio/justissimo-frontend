import React, { useEffect, useState } from 'react';
import { withWebChat } from '@ibm-watson/assistant-web-chat-react';
import CustomResponsePortalsContainer from './components/watson/CustomResponsePortalsContainer';

function App({ createWebChatInstance }) {
  const [instance, setInstance] = useState(null);

  useEffect(() => {
    const watsonAssistantChatOptions = {
      integrationID: '8cf40cb5-8eb4-43ba-ae35-b3e5908902d9',
      region: 'us-south',
      onLoad: wacInstance => {
        setInstance(wacInstance);
        wacInstance.render();
      },
    }
    createWebChatInstance(watsonAssistantChatOptions);
  }, []);

  return (
    <div className="App">
      {instance && <CustomResponsePortalsContainer instance={instance} />}
    </div>
  );
}

export default withWebChat()(App);