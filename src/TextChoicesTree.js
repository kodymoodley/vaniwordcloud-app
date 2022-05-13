import React from 'react';
import CheckboxTree from 'react-checkbox-tree';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import './button.css';
import SPDefaultImage from './sp-book-holding.png';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { color } from '@mui/system';
import { accordionDetailsClasses, getImageListItemBarUtilityClass } from '@mui/material';

const nodes = [
    {
        value: 'bg',
        label: 'Bhagavad-gītā As It Is',
        children: [
            {   
                value: 'bg1',
                label: 'Chapter 1'
            },
            { 
                value: 'bg2',
                label: 'Chapter 2' 
            },
            { 
                value: 'bg3',
                label: 'Chapter 3' 
            },
            { 
                value: 'bg4',
                label: 'Chapter 4' 
            },
            { 
                value: 'bg5',
                label: 'Chapter 5' 
            },
            { 
                value: 'bg6',
                label: 'Chapter 6' 
            },
            { 
                value: 'bg7',
                label: 'Chapter 7' 
            },
            { 
                value: 'bg8',
                label: 'Chapter 8' 
            },
            { 
                value: 'bg9',
                label: 'Chapter 9' 
            },
            { 
                value: 'bg10',
                label: 'Chapter 10' 
            },
            { 
                value: 'bg11',
                label: 'Chapter 11' 
            },
            { 
                value: 'bg12',
                label: 'Chapter 12' 
            },
            { 
                value: 'bg13',
                label: 'Chapter 13' 
            },
            { 
                value: 'bg14',
                label: 'Chapter 14' 
            },
            { 
                value: 'bg15',
                label: 'Chapter 15' 
            },
            { 
                value: 'bg16',
                label: 'Chapter 16' 
            },
            { 
                value: 'bg17',
                label: 'Chapter 17' 
            },
            { 
                value: 'bg18',
                label: 'Chapter 18' 
            }
        ]
    },
    {
        value: 'sb',
        label: 'Śrīmad-Bhāgavatam',
        children: [
            {
                value: 'sb1',
                label: 'Canto 1'
            },
            {
                value: 'sb2',
                label: 'Canto 2'
            },
            {
                value: 'sb3',
                label: 'Canto 3'
            },
            {
                value: 'sb4',
                label: 'Canto 4'
            },
            {
                value: 'sb5',
                label: 'Canto 5'
            },
            {
                value: 'sb6',
                label: 'Canto 6'
            },
            {
                value: 'sb7',
                label: 'Canto 7'
            },
            {
                value: 'sb8',
                label: 'Canto 8'
            },
            {
                value: 'sb9',
                label: 'Canto 9'
            },
            {
                value: 'sb10',
                label: 'Canto 10'
            },
            {
                value: 'sb11',
                label: 'Canto 11'
            },
            {
                value: 'sb12',
                label: 'Canto 12'
            }
        ]
    },
    {
        value: 'cc',
        label: 'Śrī Caitanya-caritāmṛta',
        children: [
            {
                value: 'adi',
                label: "Adi lila"
            },
            {
                value: 'madhya',
                label: "Madhya lila"
            },
            {
                value: 'antya',
                label: "Antya lila"
            }
        ]
    }
];

class TextChoicesTree extends React.Component {
    constructor(props){  
        super(props);  
        this.state = {
            checked: [],
            expanded: [],
            passageChecked: "sanskrit",
            words: [],
            image: ""
        };
    }  

    handlePassageChange(event) {
        this.state.passageChecked = event.target.value;
    }

    render() {
        const isDefaultImage = this.state.image == "";

        if (isDefaultImage) {
            return (
                <div>
                    <div class="checkboxesarea">
                        <CheckboxTree
                            iconsClass="fa5"
                            nodes={nodes}
                            checked={this.state.checked}
                            expanded={this.state.expanded}
                            onCheck={checked => this.setState({ checked })}
                            onExpand={expanded => this.setState({ expanded })}
                        />
                    </div>
                    <div class="gap"></div>
                    <div class="radiobuttonarea">
                        <FormControl>
                            <div class="radio-button-title-text"><FormLabel className="FormControl" id="radio-buttons-group-label"><span style={{ fontSize: '14pt', color: 'black', fontWeight: 'bold', fontFamily: '--fa-font-regular'}}>Select passage type:</span></FormLabel></div>
                            <RadioGroup
                                row
                                aria-labelledby="radio-buttons-group-label"
                                defaultValue="sanskrit"
                                onChange = {(event) => this.handlePassageChange(event)}
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="sanskrit"  control={<Radio size="small"/>} label={<span style={{ fontSize: '12pt', color: 'black', fontFamily: '--fa-font-regular'}}>Sanskrit or Bengali</span>} />
                                <FormControlLabel value="english"  control={<Radio size="small"/>} label={<span style={{ fontSize: '12pt', color: 'black', fontFamily: '--fa-font-regular'}}>English translation</span>} />
                                <FormControlLabel value="purport"  control={<Radio size="small"/>} label={<span style={{ fontSize: '12pt', color: 'black', fontFamily: '--fa-font-regular'}}>Purport</span>} />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div class = "buttonarea">
                        <button class = "button" onClick={async () => {
                                const textsSelected = this.state.checked;
                                const passageTypeSelected = this.state.passageChecked;
                                const response = await fetch("/getwordcloud", {
                                    method: "POST",
                                    headers: {
                                        'Content-Type' : 'application/json'
                                    },
                                    body: JSON.stringify({"text-selected" : textsSelected, "passage-type" : passageTypeSelected})
                                    });
                                    
                                const jsonData = await response.json();

                                if (response.ok){
                                    this.setState({
                                        ...this.state,
                                        words: jsonData["wordlist"],
                                        image: jsonData["jsonrep"]  
                                    });
                                }
                            }
                        }> Display Vaniwordcloud! 
                        </button>
                    </div>
                    <div class="gap"></div>
                    <hr class="solid"></hr>
                    <div class="gap"></div>
                    <div class="child">
                        <img class = "wordcloud" src={SPDefaultImage} />
                    </div>
                </div>
                );
        }
        else {
            return (
                <div>
                    <div class="checkboxesarea">
                        <CheckboxTree
                            iconsClass="fa5"
                            nodes={nodes}
                            checked={this.state.checked}
                            expanded={this.state.expanded}
                            onCheck={checked => this.setState({ checked })}
                            onExpand={expanded => this.setState({ expanded })}
                        />
                    </div>
                    <div class="gap"></div>
                    <div class="radiobuttonarea">
                        <FormControl>
                            <div class="radio-button-title-text"><FormLabel className="FormControl" id="radio-buttons-group-label"><span style={{ fontSize: '14pt', color: 'black', fontWeight: 'bold', fontFamily: '--fa-font-regular'}}>Select passage type:</span></FormLabel></div>
                            <RadioGroup
                                row
                                aria-labelledby="radio-buttons-group-label"
                                defaultValue="sanskrit"
                                onChange = {(event) => this.handlePassageChange(event)}
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="sanskrit"  control={<Radio size="small"/>} label={<span style={{ fontSize: '12pt', color: 'black', fontFamily: '--fa-font-regular'}}>Sanskrit or Bengali</span>} />
                                <FormControlLabel value="english"  control={<Radio size="small"/>} label={<span style={{ fontSize: '12pt', color: 'black', fontFamily: '--fa-font-regular'}}>English translation</span>} />
                                <FormControlLabel value="purport"  control={<Radio size="small"/>} label={<span style={{ fontSize: '12pt', color: 'black', fontFamily: '--fa-font-regular'}}>Purport</span>} />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div class = "buttonarea">
                        <button class = "button" onClick={async () => {
                                const textsSelected = this.state.checked;
                                const passageTypeSelected = this.state.passageChecked;
                                const response = await fetch("/getwordcloud", {
                                    method: "POST",
                                    headers: {
                                        'Content-Type' : 'application/json'
                                    },
                                    body: JSON.stringify({"text-selected" : textsSelected, "passage-type" : passageTypeSelected})
                                    });
                                    
                                const jsonData = await response.json();

                                if (response.ok){
                                    this.setState({
                                        ...this.state,
                                        words: jsonData["wordlist"],
                                        image: jsonData["jsonrep"]  
                                    });
                                }
                            }
                        }> Display Vaniwordcloud! 
                        </button>
                    </div>
                    <div class="gap"></div>
                    <hr class="solid"></hr>
                    <div class="gap"></div>
                    <div class="child">
                        <img class = "wordcloud" src={this.state.image} />
                    </div>
                </div>
                );
        }
    }
}

export default TextChoicesTree;