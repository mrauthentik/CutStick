import {TextFilter} from './text-filter';
import {ImageFilter} from './image-filter';

// i initailaize filters here

const textFilter = new TextFilter();
const imageFilter = new ImageFilter();

//Load user settings from storage

chrome.storage.sync.get(['blockedWords'], ({blockedWords}) => {
    if(blockedWords){
        textFilter.updateBlockedWords(blockedWords)
    }
})
