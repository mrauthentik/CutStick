export class TextFilter {
    private blockedWords: string[] = [
        'nude', 'sex', 'porn', 'nsfw', 'explicit',
        'adult', 'xxx', 'fuck', 'shit', 'bitch', 'ass'
    ]
    constructor(customWords:string[] = [] ){
        this.blockedWords = [...this.blockedWords, ...customWords]
    }

    containsBlockedText(text: string) : boolean {
        const lowerText = text.toLowerCase()
        return this.blockedWords.some(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'i')
            return regex.test(lowerText)
        })
    }
    filterText(text:string) : string {
        if(!this.containsBlockedText(text)) return text
        return this.blockedWords.reduce((filteredText, word) =>{
            const regex = new RegExp (`\\b${word}\\b`, 'gi')
            return filteredText.replace(regex, '***')
        }, text)
    }
}
