export function capitalizeText(text:string): string {
    return text.charAt(0).toLocaleUpperCase() + text.slice(1).toLocaleLowerCase();
}