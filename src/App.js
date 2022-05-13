import React, { useState, useEffect } from 'react';
import TextChoicesTree from "./TextChoicesTree";
import VaniWordCloudTitle from "./VaniWordCloudTitle";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import './assets/fontawesome/css/all.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
      <div class="parent">
        <div class="child">
          <VaniWordCloudTitle />
          <hr class="solid"></hr>
        </div>
        
        <div class="child">
          <div class="settings-panel-text">Select text(s): </div>
            <TextChoicesTree />
          <div class="gap"></div>
        </div>
      </div>
  );
}

export default App;
