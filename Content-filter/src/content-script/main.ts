import {TextFilter} from '../lib/textFilter';
import {ImageFilter} from './image-filter';

// i initailaize filters here

const textFilter = new TextFilter();


function filterPageContent() {
    // Get all text nodes in the document
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    )

    let node
    while(node = walker.nextNode()) {
        if(node.nodeValue && textFilter.containsBlockedText(node.nodeValue)) {
          const parent = node.parentElement
          if(parent) {
            parent.style.filter = 'blur(5px)'
            parent.dataset.filtered = 'true'

            parent.addEventListener('mouseenter', () => {
                parent.style.filter = 'blur(5px)'
            })
          }
        }
    }

}

//Initialize filter
filterPageContent()

// Watch for new content
new MutationObserver(filterPageContent).observe(document.body, {
    childList: true,
    subtree: true
})