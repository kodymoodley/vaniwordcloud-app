import React from 'react';
import './button.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

class VaniWordCloudTitle extends React.Component {
    
    render() {
        return (
            <div class = "title">
                <div class = "titlelogo">
                    <img className="vaniwordcloud-title" src='vanipedia.png' alt={"VaniWordCloud title"}/>
                </div>
                <div class = "title-text">
                    Vāṇīwordcloud
                </div>
            </div>
            );
    }
}

export default VaniWordCloudTitle;