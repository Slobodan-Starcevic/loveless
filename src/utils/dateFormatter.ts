export const dateFormatterDDMY = (dateString: string): string =>{
    const date = new Date(dateString)

    const getDaySuffix = (day: number): string => {
        switch (day % 10){
            case 1: return `${day}st`;
            case 2: return `${day}nd`;
            case 3: return `${day}rd`;
            default: return `${day}th`;
        }
    };

    return `
    ${date.toLocaleString('default', { weekday: 'long' })} 
    ${getDaySuffix(date.getDate())} 
    ${date.toLocaleString('default', {month: 'long'})} 
    ${date.getFullYear()}`
}