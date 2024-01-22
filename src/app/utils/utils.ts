export function formatBreed(breedDetail: string[]){
    return capitalized(breedDetail.join(" - "));
}

function capitalized(sentence: string){
    return sentence.split(" ").map((word) => {
        return word.slice(0,1).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase();
    }).join(" ");
}
