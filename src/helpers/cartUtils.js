export const getValueTotal = (items) => {
    total = 0.0;
    items.map((apresentation) => {
        total += parseFloat(parseInt(apresentation.quantidade) * parseFloat(apresentation.pmc.replace(',','.')));
    });    
    return total;
}